module.exports=function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=1)}([function(a){a.exports=require('electron')},function(a,b,c){'use strict';function d(){j=new e.BrowserWindow({height:563,useContentSize:!0,width:1e3,backgroundColor:'#000000'}),j.setFullScreen(!0),j.loadURL(k),j.on('closed',function(){j=null});i.setApplicationMenu(i.buildFromTemplate([{label:'Application',submenu:[{label:'About Application',selector:'orderFrontStandardAboutPanel:'},{type:'separator'},{label:'Quit',accelerator:'Command+Q',click:function(){e.app.quit()}}]},{label:'Edit',submenu:[{label:'Undo',accelerator:'CmdOrCtrl+Z',selector:'undo:'},{label:'Redo',accelerator:'Shift+CmdOrCtrl+Z',selector:'redo:'},{type:'separator'},{label:'Cut',accelerator:'CmdOrCtrl+X',selector:'cut:'},{label:'Copy',accelerator:'CmdOrCtrl+C',selector:'copy:'},{label:'Paste',accelerator:'CmdOrCtrl+V',selector:'paste:'},{label:'Select All',accelerator:'CmdOrCtrl+A',selector:'selectAll:'}]}]))}Object.defineProperty(b,'__esModule',{value:!0});var e=c(0),f=c.n(e),g=c(3),h=c.n(g),i=c(0).Menu;global.__static=c(2).join(__dirname,'/static').replace(/\\/g,'\\\\');var j=void 0,k='file://'+__dirname+'/index.html';e.app.on('ready',d),e.app.on('window-all-closed',function(){'darwin'!==process.platform&&e.app.quit()}),e.app.on('activate',function(){null===j&&d()}),g.autoUpdater.on('update-downloaded',function(){g.autoUpdater.quitAndInstall()}),e.app.on('ready',function(){g.autoUpdater.checkForUpdates()})},function(a){a.exports=require('path')},function(a){a.exports=require('electron-updater')}]);