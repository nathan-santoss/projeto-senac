document.addEventListener('DOMContentLoaded', (event) => {
    const name_agent = document.getElementById('agent-name')
    window.api.userchecked().then((agente) => {
        name_agent.innerHTML = `Agente de Suporte: ${(agente.nome).toUpperCase()}`
    })
    window.api.requestTask().then((result) => {
        if(result.length > 0){
            carregar_chamado(result)
        }else{
            document.getElementById('chamados-atuais').innerHTML = `<strong>Sem chamados no     momento</strong>`
        }
    })

    window.api.completedTask().then(completos => {
        completos.forEach(task => {
            document.getElementById('cards-concluidos').innerHTML = `
            <div class="card-atendimento card-fechado">
                <div class="header-plataforma">
                    <span id="plataform-completed" class="tag-plataforma ios">${task.plataforma}</span>
                </div>
                <div id="client-completed" style="font-weight: 500;">${task.nome}</div>
                <p id="titulo-completed" style="font-size: 13px; color: #5f6368;">${task.titulo}</p>
                <div style="font-size: 12px; color: #1e8e3e; font-weight: 600;">✓ RESOLVIDO</div>
            </div>`
        });
    })
})


let chamadoAtual
const carregar_chamado = (chamados) => {
    chamados.forEach(chamado => {
        if(chamado.status === 'pendente'){
            document.getElementById('cliente-nome').innerHTML = `${chamado.nome}`
            document.getElementById('plataforma').innerText = `${chamado.plataforma}`
            document.getElementById('titulo').innerHTML = `<strong>Assunto:</strong> ${chamado.titulo}`
            document.getElementById('relato').innerText = `"${chamado.relato}"`
        }
        chamadoAtual = chamado
    });
}

const send_bt = document.getElementById('send-bt')
send_bt.addEventListener('click', (event) => {
    window.api.updateTask(chamadoAtual)
    window.api.requestTask().then((result) => {
        if(result.length > 0){
            carregar_chamado(result)
        }else{
            document.getElementById('chamados-atuais').innerHTML = `<strong>Sem chamados no     momento</strong>`
        }
    })

})
