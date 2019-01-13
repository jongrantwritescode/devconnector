const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema(postSchema());

const postSchema = () => {
  let obj = userTextSumbission();
  obj.likes = [user()];
  obj.comments = [userTextSumbission()];

  return obj;
};

const userTextSumbission = () => {
  return {
    user: user(),
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  };
};

const user = () => {
  return {
    type: Schema.Types.ObjectId,
    ref: "users"
  };
};

module.exports = Post = mongoose.model("users", PostSchema);
