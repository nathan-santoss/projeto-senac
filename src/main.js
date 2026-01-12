import { app, BrowserWindow, Menu, dialog, ipcMain } from "electron";
import path from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import { json } from "stream/consumers";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const preload = path.join(__dirname, 'preload.js')

const page_login = path.join(__dirname, '../app/login/login.html')
const page_client = path.join(__dirname, '../app/cliente/cliente.html')
const page_task = path.join(__dirname, '../app/cliente/chamado/chamado.html')


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
    win.loadFile(page_login)
}

app.whenReady().then(() => {
    restaurarChamados()
    restaurarUsuarios()
    criarJanela()
})
app.on('window-all-closed', () => {
    gravarChamados()
    gravarUsuarios()
    app.quit()
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
            win.loadFile(page_login)
            break
        case 'client':
            win.loadFile(page_client)
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
let chamadosTotais = 0
ipcMain.handle('guardar-chamado', (event, chamado) => {
    chamado.id = `2026-00${chamadosTotais}`
    chamadosTotais++
    lista_chamados.push(chamado)
})


// imprimir novo chamado na tela do suporte
ipcMain.handle('abrir-chamado', (event) => {
    return lista_chamados
})



// atualizar chamados concluidos
ipcMain.on('atualizar-chamado', (event, chamado, resposta) => {
    let indexChamado = lista_chamados.findIndex(task => task.id === chamado.id)
    if(indexChamado === -1){return}
    lista_chamados[indexChamado].status = 'concluido'
    lista_chamados[indexChamado].resposta = resposta

})



// imprimir chamados prontos
ipcMain.handle('abrir-concluidos', (event) => {
    return lista_chamados.filter(task => task.status === 'concluido')
})

// imprimir historico de chamados do cliente

ipcMain.handle('registros-anteriores', (event, nome) => {
    let historico = lista_chamados.filter(chamado => chamado.nome === nome)
    return historico
})

// abrir chamado especifico do cliente - cliente
let chamadoSelecionado
ipcMain.on('chamado-selecionado', (event, id_chamado) => {
   chamadoSelecionado = lista_chamados.find(c => c.id === id_chamado)
   if(!chamadoSelecionado){
        chamadoSelecionado = null
        return
    }
   win.loadFile(page_task)
})
ipcMain.handle('carregar-chamado', (event) => {
    return chamadoSelecionado
})


// funcoes de gravacao e restauração de dados

// gravar dados
const save_chamados = path.join(__dirname, './data/chamados.json')
function gravarChamados(){
    let chamadosJSON = JSON.stringify(lista_chamados, null, 2)
    fs.writeFileSync(save_chamados, chamadosJSON, 'utf-8')
}

const save_usuarios = path.join(__dirname, './data/users.json')
function gravarUsuarios(){
    if (!fs.existsSync(save_usuarios)) {return}

    let usuariosJSON = JSON.stringify(usuarios, null, 2)
    fs.writeFileSync(save_usuarios, usuariosJSON, 'utf-8')
}

// restaurar dados

function restaurarChamados(){
    if (!fs.existsSync(save_chamados)){ return}

    try{
        let local = fs.readFileSync(save_chamados, 'utf-8')
        const lista_salva = JSON.parse(local)
        if(lista_salva > 0){
            lista_chamados = lista_salva
            return
        }
    }catch(e){
        return
    }
}

function restaurarUsuarios(){
    try{
        let local = fs.readFileSync(save_usuarios, 'utf-8')
        const lista = JSON.parse(local)
        if(lista > 0){
            usuarios = lista
            return
        }
    }catch(e){
        return
    }
}