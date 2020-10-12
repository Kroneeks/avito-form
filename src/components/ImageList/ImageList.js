import React, { Component } from "react";

import { Modal } from "../Modal";
import "./ImageList.css";

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      showModal: false,
      imgID: "",
    };
  }

  componentDidMount() {
    fetch("https://boiling-refuge-66454.herokuapp.com/images")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
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

  handleToggleModal(id) {
    this.setState({ showModal: !this.state.showModal, imgID: id });
  }

  render() {
    const { error, isLoaded, items, showModal } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <ul className="images-list">
            {items.map((item) => (
              <li key={item.id} onClick={() => this.handleToggleModal(item.id)}>
                <img src={item.url} alt={item.id} />
              </li>
            ))}
          </ul>
          {showModal && (
            <Modal
              id={this.state.imgID}
              onCloseRequest={() => this.handleToggleModal()}
            />
          )}
        </>
      );
    }
  }
}

export { ImageList };
