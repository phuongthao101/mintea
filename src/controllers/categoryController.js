
import pool from '../configs/connectDB.js'

let categoryPage = async (req, res) => {
    let [rows, fields] = await pool.execute('SELECT * FROM categories')
    res.render('pages/category', { data: rows })
}

export default {
    categoryPage
}