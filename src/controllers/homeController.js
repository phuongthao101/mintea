
import pool from '../configs/connectDB.js'

let homePage = async (req, res) => {

    res.render('home.ejs')


}

export default {
    homePage
}