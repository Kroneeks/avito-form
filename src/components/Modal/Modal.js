import React, { Component } from "react";
import isNil from "lodash/fp/isNil";

import { Comment } from "../Comment";
import { Form } from "../Form";
import "./Modal.css";

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      item: [],
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);

    document.body.classList.add('modal-open');

    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);

    document.body.classList.remove('modal-open');
  }

  handleKeyUp(evt) {
    const { onCloseRequest } = this.props;

    const keys = {
      27: () => {
        evt.preventDefault();
        onCloseRequest();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      },
    };

    if (keys[evt.keyCode]) {
      keys[evt.keyCode]();
    }
  }

  handleOutsideClick(evt) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(evt.target)) {
        onCloseRequest();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  handleFormSubmit(dateSubmit, text) {
    const item = this.state.item;
    item.comments.push({
      id: Math.floor(Math.random() * 1000),
      text: text,
      date: dateSubmit,
    });

    this.setState({
      item,
    });
  }

  render() {
    const { isLoaded, error, item } = this.state;

    if (error) {
      return (
        <div className="modal-overlay">
          <div className="modal" ref={(node) => (this.modal = node)}>
            <div className="modal-content">Error: {error.message}</div>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="modal-overlay">
          <div className="modal" ref={(node) => (this.modal = node)}>
            <div className="modal-content">Loading...</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="modal-overlay">
          <div className="modal" ref={(node) => (this.modal = node)}>
            <button
              className="close-btn"
              onClick={this.props.onCloseRequest}
            ></button>
            <div className="modal-content">
              <div className="modal-content__img">
                <img src={item.url} alt={item.id} />
              </div>
              <div className="modal-content__comments">
                <ul className="comments-list">
                  {item.comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      text={comment.text}
                      date={comment.date}
                    />
                  ))}
                </ul>
              </div>
              <div className="modal-content__form">
                <Form id={item.id} handleFormSubmit={this.handleFormSubmit} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
