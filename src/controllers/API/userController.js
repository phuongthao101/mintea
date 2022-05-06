import pool from '../../configs/connectDB.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
const saltRounds = 10;

let logout = async (req, res) => {
    await req.session.destroy()
    res.clearCookie("isSigned");
    return res.status(200).json()
}

let login = async (req, res) => {
    let { userName, password } = req.body

    const sql = `SELECT user_name, password, role_id FROM users WHERE
     user_name = ?`
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

    req.session.user = {
        username: user.user_name,
        roleId: user.role_id
    }

    res.cookie('isSigned', true, { maxAge: 600000 })
    //name
    res.cookie('userName', req.session.user.username, { maxAge: 600000 })

    res.status(200).json({ message: "login sussesful" })
}

const register = async (req, res) => {

    let { userName, password, email, phone, role_id } = req.body
    const sql = 'SELECT user_name, password  FROM users WHERE user_name =?'
    let [rows, fields] = await pool.execute(sql, [userName])

    if (rows.length > 0) {
        res.status(200).json({ message: 'account already registered' })
        return
    }
    let passwordHash = await bcrypt.hashSync(password, saltRounds)
    let sqlInsert = `INSERT INTO users (role_id,user_name,password, email, phone, create_at, update_at)
     VALUES (?,?,?,?,?,?,?)`
    let createAt = new Date()
    let updateAt = new Date()
    let [rows1, fields1] = await pool.execute(sqlInsert, [role_id, userName, passwordHash, email, phone, createAt, updateAt])

    res.status(200).json({ message: 'Register successful' })
}

let getRoles = async (req, res) => {
    const sql = 'SELECT * FROM role'
    let [rows, fields] = await pool.execute(sql)

    res.status(200).json(rows)
}

export default {
    login, register, getRoles, logout
}