const { app, BrowserWindow, ipcMain, dialog } = require("electron")
require("@electron/remote/main/index").initialize()
let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  })

  mainWindow.loadURL("http://localhost:3000/")
  mainWindow.webContents.openDevTools()
}

ipcMain.on("openDirectory", () => {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    })
    .then(directory => {
      mainWindow.webContents.send("directoryOpened", directory)
    })
})

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// handle window state buttons
const windowStates = {
  exit: () => app.quit(),
  minimize: () => mainWindow.minimize(),
  maximize: () =>
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize(),
}

for (state in windowStates) ipcMain.on(state, windowStates[state])
