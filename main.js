const { app, BrowserWindow } = require('electron');
const sourceHTML = require('./htmlSource');
const express = require('express');
const path = require('path');
const fs = require('fs');

const exp_app = express();
const port = 2123;

exp_app.get('/', (req, res) => {
    const json_file = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'verbs.json')));
    let HTML = sourceHTML
    const newHTML = HTML.replace("{{{!!!###!!!}}}", JSON.stringify(json_file, null, 4));

    res.setHeader('Content-type','text/html');
    res.send(newHTML);
});
  
exp_app.listen(port);

const createWindow = () => {
    const win = new BrowserWindow({
      width: 400,
      height: 400,
      resizable: false,
      icon: path.join(__dirname, "build", 'icon.png')
    });
    
    //win.webContents.openDevTools();
    win.loadURL(`http://localhost:${port}/`);
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') app.quit();
    else if (process.platform !== 'darwin') app.quit();
});
