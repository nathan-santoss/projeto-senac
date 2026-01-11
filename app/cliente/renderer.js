let cliente_nome
document.addEventListener('DOMContentLoaded', (event) => {
    const client_name = document.getElementById('client-name')
    window.api.userchecked().then((cliente) => {
        client_name.innerHTML = `Olá, <strong>${cliente.nome}</strong>`
        cliente_nome = cliente.nome
    })
})

// document.getElementById('request-title').value

const enviar_bt = document.getElementById('send-bt')

let dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });


let chamadosTotais = 0
enviar_bt.addEventListener('click', (event) => {
    chamadosTotais++
    const chamado = {
        nome: cliente_nome,
        titulo: document.getElementById('request-title').value,
        plataforma: document.getElementById('plataform').value,
        data_incidente: document.getElementById('date').value,
        relato: document.getElementById('relato').value,
        criacao: dataAtual,
        status: 'pendente',
        id: `2026/${chamadosTotais}`
    }
    window.api.registerTask(chamado).then((result) => {
        location.reload()
    })
})

const logout_bt = document.getElementById('logout-bt')

logout_bt.addEventListener('click', (event) => {
    window.api.changePage('login')
})
