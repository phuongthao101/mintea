import pool from '../../configs/connectDB.js'
import bcrypt from 'bcrypt'
const saltRounds = 10;

let login = async (req, res) => {
    let { userName, password } = req.body

    const sql = `SELECT* FROM users WHERE user_name = ?`
    let [rows, fields] = await pool.execute(sql, [userName])

    if (rows.length == 0) {
        res.status(404).json({ message: "User not found" })
        return
    }

    let user = rows[0]
    let passHash = user.password

    let results = await bcrypt.compare(password, passHash)

    if (!results) {

        res.status(404).json({ message: "password incorrect" })
        return
    }
    req.session.user = userName
    res.status(200).json({ message: "login sussesful" })

}
const register = async (req, res) => {
    let { userName, password } = req.body
    const sql = 'SELECT * FROM users WHERE user_name =?'
    let [rows, fields] = await pool.execute(sql, [userName])

    if (rows.length > 0) {
        res.status(200).json({ message: 'account already registered' })
        return
    }
    let passwordHash = bcrypt.hashSync(password, saltRounds)
    let sqlInsert = 'INSERT INTO users (user_name, password) VALUES (?, ?)'
    let [rows1, fields1] = await pool.execute(sqlInsert, [userName, passwordHash])

    res.status(200).json({ message: 'Register successful' })
}

export default {
    login, register
}