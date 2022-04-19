let loginPage = async (req, res) => {
    res.render('pages/login')
}
let registerPage = async (req, res) => {
    res.render('pages/register')
}
export default {
    loginPage, registerPage
}