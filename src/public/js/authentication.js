

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
        // Login successfully
        location.replace('/')
    }
    alert(res.message)
}
const onRegister = async (res, req) => {
    let responseRole = await fetch('api/roles', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
    let dataRole = await responseRole.json()


    let content = document.getElementById('register-form')
    let nameTxt = document.createElement('div')
    nameTxt.innerText = 'User Name'
    let userName = document.createElement('input')

    let passwordTxt = document.createElement('div')
    passwordTxt.innerText = 'Password'
    let password = document.createElement('input')

    let emailTxt = document.createElement('div')
    emailTxt.innerText = 'Email'
    let email = document.createElement('input')

    let phoneTxt = document.createElement('div')
    phoneTxt.innerText = 'Phone'
    let phone = document.createElement('input')

    let selectList = document.createElement('select')

    for (let i = 0; i < dataRole.length; i++) {
        let option = document.createElement('option')
        option.innerText = dataRole[i].name
        option.value = dataRole[i].role_id
        selectList.appendChild(option)

    }

    let submitBtn = document.createElement('button')
    submitBtn.innerText = 'Submit'

    content.appendChild(nameTxt)
    content.appendChild(userName)
    content.appendChild(passwordTxt)
    content.appendChild(password)
    content.appendChild(emailTxt)
    content.appendChild(email)
    content.appendChild(phoneTxt)
    content.appendChild(phone)

    content.appendChild(selectList)
    content.appendChild(submitBtn)
    submitBtn.onclick = async () => {
        console.log(selectList)
        let payLoad = {
            roleId: selectList.value,
            userName: userName.value,
            password: password.value,
            email: email.value,
            phone: phone.value
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

}

const logout = async () => {
    await fetch('/api/logout', {
        method: 'GET',
    })
    location.replace('/login')
}
