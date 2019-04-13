import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import main from "./Main";
import admin from "./Admin";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          msg: "Moro",
          timestamp: new Date(),
          isAdmin: false
        }
      ],
      now: "",
      speaker: "",
      supervisor: "",
      next: ""
    };
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        <Router>
          <Route exact path="/admin/" component={admin} />
          <Route exact path="/" component={main} />
        </Router>
      </div>
    );
  }
}

export default App;
