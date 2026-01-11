
document.addEventListener('DOMContentLoaded', (event) => {
    const name_agent = document.getElementById('agent-name')
    window.api.userchecked().then((agente) => {
        name_agent.innerText = `${agente.nome}`
    })
})