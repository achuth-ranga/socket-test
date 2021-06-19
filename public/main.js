const { Actions } = require("./constants/Actions");
const { TcpClient } = require("./tcp/tcp-client");
const { app, ipcMain, BrowserWindow } = require("electron");
const ACTIONS = new Actions();

var tcpclient;
var window;

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS", "DEVTRON"];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

function createWindow() {
  const win = new BrowserWindow({
    title: "Socket Test",
    minWidth: 1400,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    },
  });
  win.removeMenu();
  win.loadURL("http://localhost:3000");
  win.webContents.openDevTools();
  window = win;
  tcpclient = new TcpClient(window);
}

app.on("ready", async () => {
  if (process.argv.indexOf("--noDevServer") === -1) {
    await installExtensions();
  }
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * Register for the UI
 */
ipcMain.on(ACTIONS.TCP_CLIENT.CONNECT, (event, arg) => {
  tcpclient.disconnect();
  tcpclient.connect(arg.host, arg.port);
});
