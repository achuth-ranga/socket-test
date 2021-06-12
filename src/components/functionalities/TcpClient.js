import React, { Component } from "react";
import { ConnectionDetails } from "../RUC/ConnectionDetails";
import { UserInput } from "../RUC/UserInput";
import { DisplayTable } from "../RUC/DisplayTable";
import { TcpClientActions } from "../../constants/Actions";
import { Spinner } from "../RUC/Spinner";
import { withAlert } from "react-alert";

const { ipcRenderer } = window.require("electron");

class TcpClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultHost: "localhost",
      defaultPort: 24000,
      host: "localhost",
      port: 24000,
      displayTitle: "Data Received from TCP server",
      sendTitle: "Send Data To Server",
      connectTitle: "Connection Details",
      dataReceived: [{}],
      loading: false,
      connected: false,
      btnText: "Connect",
    };
  }
  componentDidMount() {
    /*
     * Register for call backs
     */
    let that = this;
    ipcRenderer.on(TcpClientActions.RECEIVE, that.onDataReceive);
    ipcRenderer.on(TcpClientActions.CONNECTED, that.onConnected);
    ipcRenderer.on(TcpClientActions.CONNECT_ERROR, that.onFailToConnect);
    ipcRenderer.on(TcpClientActions.DISCONNECTED, that.onDisConnected);
  }

  componentWillUnmount() {
    // ipcRenderer.removeListener(TcpClientActions.RECEIVE);
    // ipcRenderer.removeListener(TcpClientActions.CONNECTED);
    // ipcRenderer.removeListener(TcpClientActions.CONNECT_ERROR);
    // ipcRenderer.removeListener(TcpClientActions.DISCONNECTED);
    ipcRenderer.removeListener(TcpClientActions.RECEIVE, this.onDataReceive);
    ipcRenderer.removeListener(TcpClientActions.CONNECTED, this.onConnected);
    ipcRenderer.removeListener(
      TcpClientActions.CONNECT_ERROR,
      this.onFailToConnect
    );
    ipcRenderer.removeListener(
      TcpClientActions.DISCONNECTED,
      this.onDisConnected
    );
    this.disconnect();
  }

  onConnected = (event, msg) => {
    this.props.alert.success("Connected");
    this.spinner(false);
    this.setState({ connected: true, btnText: "Disconnect" });
  };

  onFailToConnect = (event, msg) => {
    this.props.alert.error("Failed to connect");
    this.resetConnection();
  };

  onDisConnected = (event, msg) => {
    this.props.alert.error("Client disconnected");
    this.resetConnection();
  };

  resetConnection() {
    this.spinner(false);
    this.setState({ connected: false, btnText: "Connect", dataReceived: [] });
  }

  spinner(state) {
    this.setState({
      loading: state,
    });
  }

  handleConnectionEvent = (host, port) => {
    if (this.state.connected) {
      this.disconnect(host, port);
    } else {
      this.connect(host, port);
    }
  };

  disconnect(host, port) {
    ipcRenderer.send(TcpClientActions.DISCONNECT, "");
    this.spinner(true);
  }

  connect = (host, port) => {
    let that = this;
    this.setState(
      {
        host: host,
        port: port,
      },
      function () {
        that.spinner(true);
        ipcRenderer.send(TcpClientActions.CONNECT, {
          host: this.state.host,
          port: this.state.port,
        });
      }
    );
  };

  onDataReceive = (event, message) => {
    let msgs = this.state.dataReceived;
    msgs.push(message);
    this.setState({ dataReceived: msgs });
  };

  sendData = (data) => {
    this.setState(
      {
        dataToSend: data,
      },
      function () {
        ipcRenderer.send(TcpClientActions.SEND, this.state.dataToSend);
      }
    );
  };

  render = () => {
    return (
      <div className="container-fluid m-2 ">
        <ConnectionDetails
          title={this.state.connectTitle}
          host={this.state.defaultHost}
          port={this.state.defaultPort}
          text={this.state.btnText}
          callback={this.handleConnectionEvent}
        ></ConnectionDetails>
        <div className="">
          {this.state.loading ? (
            <Spinner />
          ) : (
            <>
              <UserInput
                title={this.state.sendTitle}
                disable={!this.state.connected}
                callback={(e) => this.sendData(e)}
              ></UserInput>
              <DisplayTable
                title={this.state.displayTitle}
                data={this.state.dataReceived}
              ></DisplayTable>
            </>
          )}
        </div>
      </div>
    );
  };
}
export default withAlert()(TcpClient);
