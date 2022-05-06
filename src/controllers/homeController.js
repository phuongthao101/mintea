
let homePage = async (req, res) => {


    return res.render('pages/home')
}
let errorPage = async (req, res) => {
    return res.render('pages/404')
}
export default {
    homePage, errorPage
}