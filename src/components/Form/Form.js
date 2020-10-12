import React, { Component } from "react";

import "./Form.css";

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userComment: "",
      imgID: null,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      imgID: this.props.id,
    });
  }

  handleNameChange(evt) {
    this.setState({ userName: evt.target.value });
  }

  handleCommentChange(evt) {
    this.setState({ userComment: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const dateSubmit = Date.now();

    fetch(
      `https://boiling-refuge-66454.herokuapp.com/images/${this.state.imgID}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.userName,
          comment: this.state.userComment,
        }),
      }
    ).then(
      () => {
        this.props.handleFormSubmit(dateSubmit, this.state.userComment);

        this.setState({
          userName: "",
          userComment: "",
        });
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Ваше имя"
          onChange={this.handleNameChange}
          value={this.state.userName}
          type="text"
        />
        <input
          placeholder="Ваш комментарий"
          onChange={this.handleCommentChange}
          value={this.state.userComment}
          type="text"
        />
        <button className="form-btn" type="submit">
          Оставить комментарий
        </button>
      </form>
    );
  }
}
