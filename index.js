const electron = require('electron');

const { app, BrowserWindow } = electron;

app.on('ready', () => {
    console.log('Electron is running');
    new BrowserWindow({});
});