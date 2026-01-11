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
        email: 'funcionarios@gmail.com',
        senha: '12345',
        type: '1'
    },
    {
        email: 'cliente@gmail.com',
        senha: '12345',
        type: '2'
    }
]
//funçoes do preload
ipcMain.handle('solicitar-login', (event, usuario) => {
    console.log(usuario);
    let existe = usuarios.find(user => user.email === usuario.login)
    
    console.log(existe);
    if(existe){
        return existe
    }
    else{
        return false
    }
})