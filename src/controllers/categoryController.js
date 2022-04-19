
import pool from '../configs/connectDB.js'

let categoryPage = async (req, res) => {

    res.render('pages/category')
}


export default {
    categoryPage
}