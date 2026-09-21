import {validateData} from './src/data-validation.js';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
app.commandLine.appendSwitch('disable-gpu');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function baseDir(){ return app.isPackaged ? path.dirname(process.execPath) : __dirname; }
function dataDir(){ const d=path.join(baseDir(),'FinanSync_Dados'); fs.mkdirSync(d,{recursive:true}); return d; }
function backupsDir(){ const d=path.join(baseDir(),'Backups'); fs.mkdirSync(d,{recursive:true}); return d; }
function dataFile(){ return path.join(dataDir(),'finansync_data.json'); }
function readData(){ if(!fs.existsSync(dataFile())) return null; try { return JSON.parse(fs.readFileSync(dataFile(),'utf8')); } catch(e){ const corrupt=path.join(backupsDir(),`corrompido_${Date.now()}.json`); fs.copyFileSync(dataFile(),corrupt); throw new Error(`Base inválida. Cópia preservada em ${corrupt}`); } }
function writeData(data){ validateData(data); if(!data || typeof data!=='object' || !Array.isArray(data.accounts) || !Array.isArray(data.transactions)) throw new Error('Estrutura de dados inválida'); fs.mkdirSync(dataDir(),{recursive:true}); const file=dataFile(), temp=`${file}.tmp`; fs.writeFileSync(temp,JSON.stringify(data,null,2),'utf8'); JSON.parse(fs.readFileSync(temp,'utf8')); if(fs.existsSync(file)) fs.copyFileSync(file,path.join(backupsDir(),`automatico_${Date.now()}.json`)); fs.renameSync(temp,file); return true; }
function backupData(reason='manual'){reason=String(reason).replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,80); const current=readData(); if(!current) return null; const name=`backup_${new Date().toISOString().replace(/[:.]/g,'-')}_${reason}.json`; const dest=path.join(backupsDir(),name); fs.writeFileSync(dest,JSON.stringify(current,null,2),'utf8'); return dest; }
ipcMain.handle('data:read',()=>readData());
ipcMain.handle('data:write',(e,d)=>writeData(d));
ipcMain.handle('data:backup',(e,reason)=>backupData(reason));
ipcMain.handle('data:listBackups',()=>fs.existsSync(backupsDir())?fs.readdirSync(backupsDir()).filter(x=>x.endsWith('.json')).sort().reverse():[]);
ipcMain.handle('data:restore',async(e,name)=>{ const safe=path.basename(name||''); const source=path.join(backupsDir(),safe); if(!safe.endsWith('.json')||!fs.existsSync(source)) throw new Error('Backup não encontrado'); const parsed=JSON.parse(fs.readFileSync(source,'utf8')); validateData(parsed); backupData('antes_restaurar'); writeData(parsed); return parsed; });
ipcMain.handle('data:importJson',async()=>{ const {canceled,filePaths}=await dialog.showOpenDialog({properties:['openFile'],filters:[{name:'FinanSync JSON',extensions:['json']} ]}); if(canceled||!filePaths[0]) return null; return JSON.parse(fs.readFileSync(filePaths[0],'utf8')); });
ipcMain.handle('data:exportCsv',(e,{name,content})=>{ const dir=path.join(baseDir(),'Exportacoes'); fs.mkdirSync(dir,{recursive:true}); if(typeof name!=='string'||path.basename(name)!==name||!/^finansync_[a-zA-Z0-9_-]+\.(csv|json)$/.test(name))throw new Error('Nome de exportação inválido.');const file=path.join(dir,name); fs.writeFileSync(file,content,'utf8'); return file; });
function createWindow(){ const win=new BrowserWindow({width:1440,height:900,minWidth:900,minHeight:650,webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false},title:'FinanSync V53 — Resultado e previsão'}); win.webContents.setWindowOpenHandler(()=>({action:'deny'}));win.webContents.on('will-navigate',e=>e.preventDefault());win.removeMenu(); win.loadFile(path.join(__dirname,'index.html')); }
if(!app.requestSingleInstanceLock())app.quit();else app.whenReady().then(createWindow);
app.on('second-instance',()=>{const win=BrowserWindow.getAllWindows()[0];if(win){if(win.isMinimized())win.restore();win.focus();}});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
app.on('window-all-closed',()=>{ if(process.platform!=='darwin') app.quit(); });
