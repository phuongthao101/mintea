
const onLogin = async () => {

    let userName = document.getElementById('userName-id')
    let password = document.getElementById('password-id')


    let payLoad = {
        userName: userName.value,
        password: password.value
    }
    let response = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(payLoad)
    })
    let res = await response.json()

    if (response.status == 200) {
        location.replace('/')
    }
    alert(res.message)
}
const onRegister = async (req, res) => {
    let userName = document.getElementById('userNameId')
    let password = document.getElementById('passwordId')

    let payLoad = {
        userName: userName.value,
        password: password.value
    }
    let response = await fetch('api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payLoad)
    })
    let res1 = await response.json()

    if (response.status == 200) {
        location.replace('/')
    }
    alert(res1.message)

}
