import React, { Component } from "react";
import "./App.css";

import { ImageList } from "./components/ImageList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>test app</h1>
          <ImageList />
        </header>
      </div>
    );
  }
}

export default App;
