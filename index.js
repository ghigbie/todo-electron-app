const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    console.log('Electron is running');
    mainWindow = new BrowserWindow({}); //the empty object is for configuration options
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New Todo'},
            { label: 'Quit',
              accelerator: (() => {
                  if(process.platform === 'darwin'){
                    return 'Command+Q';
                  }else{
                    return 'Ctrl+Q';
                  }
              })(),
              click(){
                  app.quit();
              }
            }
        ]
    }
];

if(process.platform === 'darwin'){
    menuTemplate.unshift({});
}