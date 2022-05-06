
let categoryPage = async (req, res) => {

    res.render('pages/category')
}
let productByCategoryPage = async (req, res) => {
    res.render('pages/productByCategory')
}

export default {
    categoryPage, productByCategoryPage
}