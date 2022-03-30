
import pool from '../../configs/connectDB.js'

let getCategory = async (req, res) => {
    let [rows, fields] = await pool.execute('SELECT * FROM categories')

    res.json(rows)

}
let viewCategory = async (req, res) => {
    let id = req.params.id
    let [rows, fields] = await pool.execute('SELECT * FROM categories WHERE category_id = ?', [id])
    res.json(rows[0])

}
let createCategory = async (req, res) => {

    let { category_name } = req.body
    let creatAt = new Date()
    let updateAt = new Date()
    await pool.execute('INSERT INTO categories (category_name, create_at, update_at) VALUES (?,?,?)', [category_name, creatAt, updateAt])

    res.status(200).json()
}

let editCategory = async (req, res) => {
    let id = req.params.id
    let category_name = req.body.category_name
    await pool.execute('UPDATE categories SET category_name =? where category_id =?', [category_name, id])
    res.status(200).json()
}
let deleteCategory = async (req, res) => {
    let id = req.params.id
    await pool.execute('DELETE FROM categories WHERE category_id =?', [id])
    res.status(200).json()
}
export default {
    getCategory, viewCategory, createCategory, editCategory, deleteCategory
}