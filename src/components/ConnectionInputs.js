import React, { Component } from "react";
const { ipcRenderer } = window.require("electron");

export class ConnectionInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "localhost",
      port: 24000,
      received: [{ time: "today", msg: "Message" }],
    };
  }

  connect = () => {
    let that = this;
    ipcRenderer.sendSync("tcp-client-connect", {
      host: this.state.host,
      port: this.state.port,
    });
    // From Server
    ipcRenderer.on("tcp-client-receive", function (evt, message) {
      console.log(message); 
      let msgs = that.state.received;
      msgs.push(message);
      that.setState({ received: msgs });
    });
  };

  sendData = () => {
    ipcRenderer.send("tcp-client-send", this.state.dataToSend);
  };

  handleSendTextArea = (event) => {
    this.setState({ dataToSend: event.target.value });
  };

  render = () => {
    const style = {
      minWidth: "100%",
    };
    return (
      <div className="container-fluid m-2">
        <form className="m-lg-3 bg-light-gray" action="">
          <div className="form-group row">
            <label className="col-sm-0 col-form-label">Host</label>
            <div className="p-1">
              <input
                type="text"
                className="form-control"
                id="host"
                placeholder="localhost"
              />
            </div>
            <label className="col-sm-0 col-form-label">Port</label>
            <div className="p-1 col-md-1">
              <input
                type="number"
                className="form-control"
                id="host"
                placeholder="24000"
              />
            </div>
            <div className="p-1">
              <button
                type="button"
                className="btn btn-primary form-control"
                onClick={this.connect}
              >
                Connect
              </button>
            </div>
          </div>
        </form>

        <form className=" p-3 bg-light-gray">
          <div className="form-group row">
            <div className="p-1">
              <textarea
                type="text"
                className="form-control col-xs-12"
                rows="7"
                cols="50"
                style={style}
                id="host"
                placeholder=""
                onChange={this.handleSendTextArea}
              />
            </div>

            <div className="p-3">
              <button
                className="btn btn-primary btn-lg"
                onClick={this.sendData}
              >
                Send
              </button>
            </div>
          </div>
        </form>

        <h4 className="text-center text-white bg-dark">Data From server</h4>
        <table className="table table-responsive-lg table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.received.map((data) => (
              <tr key={data.time}>
                <td>{data.time}</td>
                <td>{data.msg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
}
