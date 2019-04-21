'use strict'

import { app, BrowserWindow, ipcMain, screen } from 'electron'
var menu = require("electron").Menu;

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    //width: 1920,
    //height: 1152,
    width: 1024,
    height: 768,
    useContentSize: true,
    backgroundColor: '#000000'
  })

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  if(width <= 1920)
  {
    mainWindow.setFullScreen(true)
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  var template = [{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];

menu.setApplicationMenu(menu.buildFromTemplate(template));
mainWindow.setMenuBarVisibility(false);
}

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');
//app.commandLine.appendSwitch('js-flags', '--force-gpu-mem-available-mb=4096');
app.commandLine.appendSwitch('js-flags', '--disable-gpu-vsync');

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// debug stuffs.
// if(process.env.NODE_ENV !== 'development')
// {
//   require('electron-debug')({ showDevTools: true })
//   require('electron').app.on('ready', () => {
//     let installExtension = require('electron-devtools-installer')
//     installExtension.default(installExtension.VUEJS_DEVTOOLS)
//       .then(() => {})
//       .catch(err => {
//         alert('Unable to install `vue-devtools`: \n', err)
//       })

//     mainWindow.openDevTools()
//   })
// }


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */



import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  //autoUpdater.quitAndInstall()
  mainWindow.webContents.send('updateReady')
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') 
  {
    autoUpdater.checkForUpdates()
  }
})

ipcMain.on("quitAndInstall", (event, arg) => {
  autoUpdater.quitAndInstall();
})
 
