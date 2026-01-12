let cliente_nome
document.addEventListener('DOMContentLoaded', (event) => {
    const client_name = document.getElementById('client-name')
    window.api.userchecked().then((cliente) => {
        client_name.innerHTML = `Olá, <strong>${cliente.nome}</strong>`
        cliente_nome = cliente.nome
        carregarHistorico(cliente_nome)
    })

    
})

// document.getElementById('request-title').value


let dataAtual = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
});



const enviar_bt = document.getElementById('send-bt')
enviar_bt.addEventListener('click', (event) => {
    const chamado = {
        nome: cliente_nome,
        titulo: document.getElementById('request-title').value,
        plataforma: document.getElementById('plataform').value,
        data_incidente: document.getElementById('date').value,
        relato: document.getElementById('relato').value,
        criacao: dataAtual,
        status: 'pendente',
        id: undefined
    }
    window.api.registerTask(chamado).then((result) => {
        location.reload()
    })
})

const logout_bt = document.getElementById('logout-bt')

logout_bt.addEventListener('click', (event) => {
    window.api.changePage('login')
})


let divHistorico = document.getElementById('historico')
function carregarHistorico(nome){
    window.api.previous(nome).then((lista) =>{
        if(lista.length > 0){
            divHistorico.innerHTML = '<h3 class="titulo-card">Seu Histórico</h3>'
    
            lista.forEach(chamado => {
                let andamento
                let cores
                if(chamado.status === 'pendente'){
                    andamento = 'Em Análise'
                    cores = 'style="font-size: 13px; color: #5f6368; margin: 8px 0;"'
                }else{
                    andamento = 'Resolvido'
                    cores = 'class="badge" style="background:#e6f4ea; color:#137333;"'
                }

                divHistorico.innerHTML += `<div class="chamado-lista">
                    <div data-id ="${chamado.id} style="display: flex; justify-content: space-between;">
                        <strong>${chamado.titulo} #${chamado.id}</strong>
                        <span class="badge">${andamento}</span>
                    </div>
                    <p ${cores}>(Data de finalização ou andamento)</p>
                </div>`
                
            });
        }
    })
}
divHistorico.addEventListener('click', (event) => {
    const chamadoClicado = event.target.closest('[data-id]')
    if(chamadoClicado){
        const id_chamado = chamadoClicado.getAttribute('data-id')
        window.api.selectTask(id_chamado)
    }
})

