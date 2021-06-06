const { ipcMain } = require("electron");
var net = require("net");

class TcpClient {
  constructor(host, port, window) {
    this.host = host;
    this.port = port;
    this.window = window;
  }

  connect() {
    let that = this;
    this.client = new net.Socket();
    this.client.connect(this.port, this.host, function () {
      ipcMain.on("tcp-client-send", (event, arg) => {
        console.log(arg);
        that.send(arg);
      });
    });

    this.client.on("data", function (data) {
      console.log("Received " + data.toString());
      that.window.webContents.send("tcp-client-receive", {
        time: new Date().toISOString(),
        msg: data.toString(),
      });
      that.window.webContents.on("did-finish-load", function () {
        console.log("Received2 " + data.toString());
        that.window.webContents.send("tcp-client-receive", {
          time: new Date().toISOString(),
          msg: data.toString(),
        });
      });
    });

    this.client.on("close", function () {});

    this.client.on("error", function (error) {
      console.log(error);
    });
  }

  send(data) {
    this.client.write(data);
  }

  disconnect() {
    this.client.destroy();
  }

  print() {
    console.log("Name is :" + this.name);
  }
}

module.exports = { TcpClient: TcpClient };
