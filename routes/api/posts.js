const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validatePostInput = require("../../validation/post");

//Load Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts/
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route   GET api/posts/:post_id
// @desc    Get single post
// @access  Public
router.get("/:post_id", (req, res) => {
  Post.findOne({ _id: req.params.post_id }).then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Get single post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (post.user.toString() === req.user.id) {
          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err =>
              res.status(404).json({ postnotfound: "Post Not Found" })
            );
        } else {
          res.status(401).json({ notauthorized: "User not authorized" });
        }
      });
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like single post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.some(like => like.user.toString())) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          post.likes.push({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post Not Found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Remove like from a single post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      console.log(profile);
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.some(like => like.user.toString())) {
            let removeIndex = post.likes.findIndex({ user: req.user.id });
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
          } else {
            return res
              .status(400)
              .json({ alreadyliked: "User needs to like this post" });
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "Post Not Found" }));
    });
  }
);

// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETTE api/posts/comment/:id/:comment_id
// @desc    Add comment to post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        let removeIndex = posts.comment.findIndex(
          comment => comment._id.toString() === req.params.comment
        );

        if (removeIndex >= 0) {
          post.comments.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        } else {
          res.status(404).json({ postnotfound: "Post Not Found" });
        }
      })
      .catch(err => res.status(404).json({ postnotfound: "Post Not Found" }));
  }
);

// @route   DELETE api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.delete(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post Not Found" }));
  }
);
module.exports = router;
