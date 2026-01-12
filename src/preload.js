import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    changePage: (page_name) => ipcRenderer.send('mudar-pagina', page_name),
    loginRequest: (user) => ipcRenderer.invoke('solicitar-login', user),
    userchecked: () => ipcRenderer.invoke('user-checked'),
    registerTask: (task) => ipcRenderer.invoke('guardar-chamado', task),
    requestTask: () => ipcRenderer.invoke('abrir-chamado'),
    updateTask: (chamado, resposta) => ipcRenderer.send('atualizar-chamado', chamado, resposta),
    completedTask: () => ipcRenderer.invoke('abrir-concluidos'),
    previous: (nome) => ipcRenderer.invoke('registros-anteriores', nome),
    selectTask: (id) => ipcRenderer.send('chamado-selecionado', id),
    loadcall: () => ipcRenderer.invoke('carregar-chamado')
})

