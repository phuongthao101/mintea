import pool from '../configs/connectDB.js'
let productPage = async (req, res) => {
    res.render('pages/product')
}

export default {
    productPage
}