const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

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
    addWindow.on('closed', () => addWindow = null); //this helps with memory management. It gives a null reference for addwindow after the window is closed
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close(); //this closes the add window after a todo has been submited
})


const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'New Todo',
                accelerator: isDarwin ? 'Command+N' : 'Ctrl+N',
                click(){ createAddWindow();}
            },
            {
                label: 'Clear Todos',
                accelerator: isDarwin ? 'Command+C' : 'Ctrl+C',
                click(){mainWindow.webContents.send('todo:clear')}
            },
            { 
                label: 'Quit',
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
                role: 'reload'
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: isDarwin ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) { //focused window is which window is use by the developer
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}