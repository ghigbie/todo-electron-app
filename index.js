const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    console.log('Electron is running');
    mainWindow = new BrowserWindow({}); //the empty object is for configuration options
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
});

const menuTemplate = [
    {
        lable: 'File'
    }
]