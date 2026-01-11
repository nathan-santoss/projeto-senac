import { app, BrowserWindow, Menu, dialog, ipcMain } from "electron";
import path from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const preload = path.join(__dirname, 'preload.js')

const page_home = path.join(__dirname, '../app/login/login.html')
const page_client = null // colocar 


let win = null
const criarJanela = () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: true,
            sandbox: false,
            preload: preload
        }
    })
    win.maximize()
    win.removeMenu()
    win.loadFile(page_home)
}

app.whenReady().then(() => {
    criarJanela()
})

// tipo 1 = funcionarios
// tipo 2 = clientes
let usuarios = [
    {   
        nome: 'Nathan Santos',
        email: 'funcionarios@gmail.com',
        senha: '12345',
        type: '1'
    },
    {   
        nome: 'Rafael Manna',
        email: 'cliente@gmail.com',
        senha: '12345',
        type: '2'
    }
]
//funçoes do preload
ipcMain.on('mudar-pagina', (event, pagina) => {
    switch(pagina){
        case 'login':
            win.loadFile(page_home)
            break
    }
})

// login personalizado com nome
ipcMain.handle('solicitar-login', (event, usuario) => {
    // console.log(usuario);
    let existe = usuarios.find(user => user.email === usuario.login)
    
    // console.log(existe);
    if(existe){
        usuarioLogado = existe
        return existe
    }
    else{
        return false
    }
})
let usuarioLogado

ipcMain.handle('user-checked', (event) => {
    return usuarioLogado
})

// coletando solicitação do cliente
let lista_chamados = []
ipcMain.handle('guardar-chamado', (event, chamado) => {
    lista_chamados.push(chamado)
})


// imprimir novo chamado na tela do suporte
ipcMain.handle('abrir-chamado', (event) => {
    return lista_chamados
})



// atualizar chamados concluidos
ipcMain.on('atualizar-chamado', (event, chamado) => {
    let indexChamado = lista_chamados.indexOf(task => task.nome === chamado.nome && task.titulo === chamado.titulo && task.relato === chamado.relato)
    if(indexChamado === -1){return}
    lista_chamados[indexChamado].status === 'concluido'
})





// imprimir chamados prontos
let concluidos = []
ipcMain.handle('abrir-concluidos', (event) => {
    lista_chamados.forEach(pronto => {
        if(pronto.status === 'concluido'){
            concluidos.push(pronto)
        }
    });
    return concluidos
})