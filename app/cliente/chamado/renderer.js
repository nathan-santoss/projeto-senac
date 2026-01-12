let chamadoAtual
document.addEventListener('DOMContentLoaded', (event) => {
    window.api.loadcall().then((task) => {
        chamadoAtual = task

        document.getElementById('titulo').innerHTML = `<strong>Assunto: </strong> ${chamadoAtual.titulo}`
        document.getElementById('id').innerHTML = `<strong>Protocolo: </strong> #${chamadoAtual.id}`
        document.getElementById('status').innerHTML = `${chamadoAtual.status} `
        document.getElementById('nome').innerHTML = `${chamadoAtual.nome}`
        document.getElementById('plataforma').innerHTML = `${chamadoAtual.plataforma}`
        document.getElementById('criacao').innerHTML = `${chamadoAtual.criacao}`
        document.getElementById('data-incidente').innerHTML = `${chamadoAtual.data_incidente}`
        document.getElementById('relato').innerHTML = `${chamadoAtual.relato}`
    })
})

const back_page = document.getElementById('back')
back_page.addEventListener('click', (event) => {
    window.api.changePage('client')
})

const logout_bt = document.getElementById('logout-bt')
logout_bt.addEventListener('click', (event) => {
    window.api.changePage('login')
})
