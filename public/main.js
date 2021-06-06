 const {TcpClient} =  require('./tcp/tcp-client')

const { app, ipcMain, BrowserWindow } = require("electron");
var tcpclient;
var window;

function createWindow() {
  const win = new BrowserWindow({
    title:"Socket Test",
    minWidth: 1400,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.removeMenu();
  win.loadURL("http://localhost:3000");
  win.webContents.openDevTools()
  window = win

}
app.whenReady().then(createWindow);


ipcMain.on('tcp-client-connect', (event, arg) => {
  console.log("sync",arg) // prints "sync ping"
  // if(tcpclient){
  //   tcpclient.disconnect();
  // }
  tcpclient = new TcpClient(arg.host, arg.port, window);
  tcpclient.connect();
  
})

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
