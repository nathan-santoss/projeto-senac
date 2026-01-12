document.addEventListener('DOMContentLoaded', (event) => {
    const name_agent = document.getElementById('agent-name')
    window.api.userchecked().then((agente) => {
        name_agent.innerHTML = `Agente de Suporte: ${(agente.nome).toUpperCase()}`
    })
    window.api.requestTask().then((result) => {
        carregar_chamado(result)
    })

    window.api.completedTask().then(completos => {
        let divConcluidos = document.getElementById('cards-concluidos')

        divConcluidos.innerHTML = `<div class="coluna-titulo">Concluídos Hoje</div>`

        completos.forEach(task => {
            divConcluidos.innerHTML += `
                <div class="card-atendimento card-fechado">
                    <div class="header-plataforma">
                        <span class="tag-plataforma ios">${task.plataforma}</span>
                    </div>
                    <div style="font-weight: 500;">${task.nome}</div>
                    <p style="font-size: 13px; color: #5f6368;">${task.titulo}</p>
                    <div style="font-size: 12px; color: #1e8e3e; font-weight: 600;">✓ RESOLVIDO</div>
                </div>`
        });
    })
})


let chamadoAtual
const carregar_chamado = (chamados) => {
    const pendencias = chamados.filter(c => c.status === 'pendente')
    if(pendencias.length > 0){
        const chamado = pendencias[0]; 
        document.getElementById('cliente-nome').innerHTML = `${chamado.nome}`
        document.getElementById('plataforma').innerHTML = `${chamado.plataforma}`
        document.getElementById('titulo').innerHTML = `<strong>Assunto:</strong> ${chamado.titulo}`
        document.getElementById('relato').innerHTML = `"${chamado.relato}"`
        chamadoAtual = chamado;
    }else{
        document.getElementById('chamados-atuais').innerHTML = `<strong>Sem chamados no     momento</strong>`
        return
    }
}

const send_bt = document.getElementById('send-bt')
send_bt.addEventListener('click', (event) => {
    let resposta = document.getElementById('resposta').value
    window.api.updateTask(chamadoAtual, resposta)
    setTimeout(() => {
        location.reload()
    }, 100);

})

const logout_bt = document.getElementById('logout-bt')
logout_bt.addEventListener('click', (event) => {
    window.api.changePage('login')
})
