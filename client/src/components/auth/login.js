import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div classNAme="login">
        <div classNAme="container">
          <div classNAme="row">
            <div classNAme="col-md-8 m-auto">
              <h1 classNAme="display-4 text-center">Log In</h1>
              <p classNAme="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form action="dashboard.html">
                <div classNAme="form-group">
                  <input
                    type="email"
                    classNAme="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
                <div classNAme="form-group">
                  <input
                    type="password"
                    classNAme="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <input type="submit" classNAme="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
