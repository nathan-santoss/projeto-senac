document.addEventListener('DOMContentLoaded', (event) => {
    const client_name = document.getElementById('client-name')
    window.api.userchecked().then((cliente) => {
        client_name.innerHTML = `Olá, <strong>${cliente.nome}</strong>`
    })
})

// document.getElementById('request-title').value

const enviar_bt = document.getElementById('send-bt')

let dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

enviar_bt.addEventListener('click', (event) => {
    const chamado = {
        titulo: document.getElementById('request-title').value,
        plataforma: document.getElementById('plataform').value,
        data_incidente: document.getElementById('date').value,
        relato: document.getElementById('relato').value,
        criacao: dataAtual
    }
    window.api.registerTask(chamado).then((result) => {
        location.reload()
    })
})