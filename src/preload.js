import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    changePage: (page_name) => ipcRenderer.send('mudar-pagina', page_name),
    loginRequest: (user) => ipcRenderer.invoke('solicitar-login', user),
    userchecked: () => ipcRenderer.invoke('user-checked'),
    registerTask: (task) => ipcRenderer.invoke('guardar-chamado', task),
    requestTask: () => ipcRenderer.invoke('abrir-chamado'),
    updateTask: (chamado) => ipcRenderer.send('atualizar-chamado', chamado),
    compledTask: () => ipcRenderer.invoke('abrir-concluidos')
})
