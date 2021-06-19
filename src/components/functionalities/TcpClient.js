import React, { Component } from "react";
import { ConnectionDetails } from "../RUC/ConnectionDetails";
import { UserInput } from "../RUC/UserInput";
import { DisplayTable } from "../RUC/DisplayTable";
import { Spinner } from "../RUC/Spinner";
import { withAlert } from "react-alert";

/**
 * Using the Node packages here
 */
const remote = window.require("electron").remote;
const net = remote.require("net");

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
    this.clientSocket = null;
  }
  componentDidMount() {}

  componentWillUnmount() {
    this.disconnectClient();
  }

  spinner = (state) => {
    this.setState({
      loading: state,
    });
  }

  resetConnection = ()=> {
    this.spinner(false);
    this.setState({ connected: false, btnText: "Connect", dataReceived: [] });
  }

  disconnectClient = ()=> {
    try {
      this.clientSocket.destroy();
    } catch (error) {}
  }

  disconnect = () => {
    this.disconnectClient();
    this.spinner(true);
  }

  onClientConnected = () => {
    this.props.alert.success("Connected");
    this.spinner(false);
    this.setState({ connected: true, btnText: "Disconnect" });
  };

  onClientFailToConnect = (error) => {
    this.props.alert.error("Failed to connect "+error.code);
    this.resetConnection();
  };

  onClientDisConnected = (error) => {
    if (this.state.connected) {
      this.props.alert.error("Client disconnected ");
      this.resetConnection();
    }
  };

  onDataReceiveFromClient = (buffer) => {
    let message = {
      time: new Date().toISOString(),
      msg: buffer.toString(),
    };
    let msgs = this.state.dataReceived;
    msgs.push(message);
    this.setState({ dataReceived: msgs });
  };

  sendDataToClient = (data) => {
    let that = this;
    this.setState(
      {
        dataToSend: data,
      },
      function () {
        that.clientSocket.write(data);
      }
    );
  };

  createTcpSocketConnection = () => {
    this.spinner(true);
    if (this.clientSocket) {
      this.disconnectClient();
    }
    let that = this;
    this.clientSocket = new net.Socket();
    this.clientSocket.on("connect", that.onClientConnected);
    this.clientSocket.on("data", that.onDataReceiveFromClient);
    this.clientSocket.on("close", that.onClientDisConnected);
    this.clientSocket.on("error", that.onClientFailToConnect);
    this.clientSocket.connect(this.state.port, this.state.host);
  };

  handleConnection = ()=>{
    if(this.state.connected){
      this.disconnect()
    }else{
      this.createTcpSocketConnection();
    }
  }

  connect = (host, port) => {
    let that = this;
    this.setState(
      {
        host: host,
        port: port,
      },
      that.handleConnection
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
          callback={this.connect}
        ></ConnectionDetails>
        <div className="">
          {this.state.loading ? (
            <Spinner />
          ) : (
            <>
              <UserInput
                title={this.state.sendTitle}
                disable={!this.state.connected}
                callback={(e) => this.sendDataToClient(e)}
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
