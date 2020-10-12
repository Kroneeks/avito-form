import React, { Component } from "react";

import "./Comment.css";

export class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
    };
  }

  componentDidMount() {
    const convertDate = (new Date(this.props.date)).toLocaleDateString();

    this.setState({
      date: convertDate,
    });
  }

  render() {
    return (
      <li className="comments-list__item">
        <p className="comments-list__date">{this.state.date}</p>
        <p className="comments-list__text">{this.props.text}</p>
      </li>
    );
  }
}
