import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";

class AuthorForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    imageUrl: "",
    books: []
  };

  submitAuthor = event => {
    event.preventDefault();
    this.props.postAuthor(this.state, this.props.closeModal);
  };

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="first_name"
              onChange={this.onTextchange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="last_name"
              onChange={this.onTextchange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              onChange={this.onTextchange}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postAuthor: (newAuthor, closeModal) =>
      dispatch(actionCreators.postAuthor(newAuthor, closeModal))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthorForm);
