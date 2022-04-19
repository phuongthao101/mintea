import pool from '../configs/connectDB.js'
let productPage = async (req, res) => {
    let [rows, fields] = await pool.execute('SELECT * FROM products')

    res.render('pages/product', { data: rows })

}

export default {
    productPage
}