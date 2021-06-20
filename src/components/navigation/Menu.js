import React, { Component } from "react";
import {withRouter} from 'react-router-dom';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    let menuItems = [
      { title: "TCP Client", link: "/tcpclient", links: ["/", "/tcpclient"] },
      { title: "TCP Server",  link: "/tcpserver",links: ["/tcpserver"] },
      { title: "MQTT Client", link: "/mqttclient", links: ["/mqttclient"] },
      { title: "MQTT Server",  link: "/mqttserver",links: ["/mqttserver"] },
    ];
    // console.log("sadsa", window.location.pathname);
    // console.log(this.props.location.pathname);

    return (
      <ul className="nav nav-tabs bg-gray font-weight-bold m-2">
        {menuItems.map((menu) => (
          <li key={menu.title} className="nav-item">
            <a
              className={
                menu.links.includes(this.props.location.pathname) ===true
                  ? "nav-link active"
                  : "nav-link"
              }
              href={"#"+menu.link}
            >
              {menu.title}
            </a>
          </li>
        ))}
      </ul>
    );
  };
}

export default withRouter(Menu);
