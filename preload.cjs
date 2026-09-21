const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('finansyncAPI',{
 read:()=>ipcRenderer.invoke('data:read'),
 write:(data)=>ipcRenderer.invoke('data:write',data),
 backup:(reason)=>ipcRenderer.invoke('data:backup',reason),
 exportCsv:(payload)=>ipcRenderer.invoke('data:exportCsv',payload),
 listBackups:()=>ipcRenderer.invoke('data:listBackups'),
 restore:(name)=>ipcRenderer.invoke('data:restore',name),
 importJson:()=>ipcRenderer.invoke('data:importJson')
});
