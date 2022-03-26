const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    title:"Musik",
    width: 700,
    height: 500,
    icon:"/assets/logo/logo1.png",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true
    }
  })

  win.loadURL("http://localhost:3000");
  win.removeMenu();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})