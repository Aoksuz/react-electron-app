const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow () {   
  // Create the browser window.     
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  }) 
        
  // and load the index.html of the app.     
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
}

ipcMain.on('notify', (_, message) => {
  const notification = {
    title: 'Ping!',
    body: 'Hello, this is Electron-app'
  }
  new Notification(notification).show()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
