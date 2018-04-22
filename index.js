const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    console.log('Electron is running');
    mainWindow = new BrowserWindow({}); //the empty object is for configuration options
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New Todo',
              accelerator: process.platform === 'darwin' ? 'Command+N' : 'Crtl+N',
              click(){ createAddWindow();}
            },
            { label: 'Quit',
              accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
              click(){ app.quit();}
            }
        ]
    }
];

if(process.platform === 'darwin'){
    menuTemplate.unshift({});
}