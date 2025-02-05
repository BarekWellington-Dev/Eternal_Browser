const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

app.whenReady().then(() => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // Configura el proxy Tor
  session.defaultSession.setProxy({
    proxyRules: 'socks5://127.0.0.1:9050',
  }).then(() => {
    mainWindow.loadFile('INDEX.html').catch((err) => {
      console.error('Error al cargar el archivo HTML:', err);
    });
  }).catch((error) => {
    console.error('Error al configurar el proxy:', error);
  });

  // Abrir DevTools (Opcional)
  mainWindow.webContents.openDevTools();

  // Iniciar búsqueda de actualizaciones
  autoUpdater.checkForUpdatesAndNotify();
});

// Manejo de eventos de actualización
autoUpdater.on('update-available', () => {
  console.log('Nueva actualización disponible. Descargando...');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Actualización descargada. Aplicando...');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
  console.error('Error en actualización:', error);
});

// Salir cuando se cierren todas las ventanas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
