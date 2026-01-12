let chamadoAtual
document.addEventListener('DOMContentLoaded', (event) => {
    window.api.loadcall().then((task) => {
        chamadoAtual = task
    })

    document.getElementById('titulo').innerHTML = `<strong>Assunto: </strong> ${chamadoAtual.titulo}`
    document.getElementById('id').innerHTML = `<strong>Assunto: </strong> ${chamadoAtual.id}`
    document.getElementById('status').innerHTML = `<strong>#Protocolo: ${chamadoAtual.status} </strong> `
    document.getElementById('nome').innerHTML = `${chamadoAtual.nome}`
    document.getElementById('plataforma').innerHTML = `${chamadoAtual.plataforma}`
    document.getElementById('criacao').innerHTML = `${chamadoAtual.criacao}`
    document.getElementById('data-incidente').innerHTML = `${chamadoAtual.data_incidente}`
    document.getElementById('relato').innerHTML = `${chamadoAtual.relato}`


})

