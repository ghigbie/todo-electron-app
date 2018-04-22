const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

//this function sets a boolean to determie if the operating system is OSX or Widows
let isDarwin = () => process.platform === 'darwin'? true : false;


app.on('ready', () => {
    console.log('Electron is running');
    mainWindow = new BrowserWindow({}); //the empty object is for configuration options
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo'
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New Todo',
              accelerator: isDarwin ? 'Command+N' : 'Crtl+N',
              click(){ createAddWindow();}
            },
            { label: 'Quit',
              accelerator: isDarwin ? 'Command+Q' : 'Ctrl+Q',
              click(){ app.quit();}
            }
        ]
    }
];

isDarwin && menuTemplate.unshift({});
if (process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: 'DEVELOPER',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: isDarwin ? 'Command+Atl+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) { //focused window is which window is use by the developer
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}