let homePage = async (req, res) => {
    req.session.user = 'userA'
    res.render('pages/home')
}

export default {
    homePage
}