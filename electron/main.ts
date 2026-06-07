import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { spawn, ChildProcess } from 'child_process';
import axios from 'axios';

let backendProcess: ChildProcess | null = null;

async function startBackend() {
  const backendPath = isDev
    ? path.join(__dirname, '../../backend/main.py')
    : path.join(process.resourcesPath, 'backend/dist/medicore-api');

  if (isDev) {
    backendProcess = spawn('python', [backendPath], { shell: true });
  } else {
    backendProcess = spawn(backendPath);
  }

  backendProcess.stdout?.on('data', (data) => console.log(`Backend: ${data}`));
  backendProcess.stderr?.on('data', (data) => console.error(`Backend Error: ${data}`));
}

async function waitForBackend(url: string, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await axios.get(url);
      return true;
    } catch (e) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return false;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'MediCore - SUCCESS ABOVE DREAMS',
    show: false,
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  win.maximize();
  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(async () => {
  // 1. Start Postgres (bundled in resources in production)
  // 2. Run migrations
  // 3. Start Backend
  await startBackend();

  // 4. Wait for backend health check
  const isReady = await waitForBackend('http://localhost:8767/health');

  if (isReady) {
    createWindow();
  } else {
    console.error('Backend failed to start');
    app.quit();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
