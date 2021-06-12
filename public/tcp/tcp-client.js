const { ipcMain } = require("electron");
var net = require("net");
const { Actions } = require("../constants/Actions");
const ACTIONS = new Actions();

class TcpClient {
  constructor(window) {
    this.window = window;
  }

  sendFunction = (event, arg) => {
    this.send(arg);
  };

  disConnectFunction = (event, arg) => {
    this.disconnect();
    this.window.webContents.send(
      ACTIONS.TCP_CLIENT.DISCONNECTED,
      "Client disconnected"
    );
  };

  connect(host, port) {
    let that = this;
    this.client = new net.Socket();
    this.client.connect(port, host, function () {
      that.connected = true;
      /**
       * Register for Data Send
       */
      ipcMain.on(ACTIONS.TCP_CLIENT.SEND, that.sendFunction);
      ipcMain.on(ACTIONS.TCP_CLIENT.DISCONNECT, that.disConnectFunction);
      /**
       * Send the Connected Message
       */
      that.window.webContents.send(
        ACTIONS.TCP_CLIENT.CONNECTED,
        "Client Connected Successfully"
      );
    });

    this.client.on("data", function (data) {
      that.window.webContents.send(ACTIONS.TCP_CLIENT.RECEIVE, {
        time: new Date().toISOString(),
        msg: data.toString(),
      });
    });

    this.client.on("close", function () {
      if (that.connected) {
        that.window.webContents.send(
          ACTIONS.TCP_CLIENT.DISCONNECTED,
          "Client disconnected"
        );
      }
      that.connected = false;
    });

    this.client.on("error", function (error) {
      that.connected = false;
      that.window.webContents.send(
        ACTIONS.TCP_CLIENT.CONNECT_ERROR,
        "Client disconnected"
      );
    });
  }

  send(data) {
    this.client.write(data);
  }

  disconnect() {
    try {
      this.client.destroy();
    } catch (error) {}
    this.clean();
  }

  clean() {
    ipcMain.removeListener(ACTIONS.TCP_CLIENT.SEND, this.sendFunction);
    ipcMain.removeListener(
      ACTIONS.TCP_CLIENT.DISCONNECT,
      this.disConnectFunction
    );
  }
}

module.exports = { TcpClient: TcpClient };
