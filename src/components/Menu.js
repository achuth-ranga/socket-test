import React, { Component } from "react";

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <ul className="nav nav-tabs bg-gray m-2">
        <li className="nav-item">
          <a className="nav-link" href="/">
            TCP Server
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/">
            TCP Client
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            MQTT Client
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            MQTT Server
          </a>
        </li>
      </ul>
    );
  };
}
