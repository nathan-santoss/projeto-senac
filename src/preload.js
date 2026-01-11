import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    loginRequest: (user) => ipcRenderer.invoke('solicitar-login', user),
    userchecked: () => ipcRenderer.invoke('user-checked')
    
})