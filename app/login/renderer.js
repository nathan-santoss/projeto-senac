const login_bt = document.getElementById('login-bt')

login_bt.addEventListener('click', (event) => {
    const user = {
        login: document.getElementById('email').value,
        senha: document.getElementById('pass').value
    }
    window.api.loginRequest(user).then((result) => {
        switch(result.type){
            case "1":
                window.location.href = '../suporte/suporte.html'
                break
            case "2":
                window.location.href = '../cliente/cliente.html'
                break
            default:
                alert(result)
        }
    })
})