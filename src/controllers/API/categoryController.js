
import pool from '../../configs/connectDB.js'
let getTotalCount = async (queryCategoryName) => {

    const totalCountSql = `SELECT COUNT(*) AS totalCount FROM categories
     WHERE category_name `+ queryCategoryName + `
      `
    let [rows, fields] = await pool.execute(totalCountSql)

    return rows[0].totalCount

}
let getCategory = async (req, res) => {
    //get query from request
    let { page, perpage, category_name } = req.query
    if (!page) {
        page = 1
    }
    if (!perpage) {
        perpage = 2
    }
    let queryCategoryName = "like '%" + category_name + "%'"
    if (!category_name) {
        queryCategoryName = "= category_name"
    }

    //select database 
    const sql = `
    SELECT * FROM categories
    
    WHERE 
    category_name `+ queryCategoryName + `
    LIMIT ?
    OFFSET ? 
    `
    let [rows, fields] = await pool.execute(sql, [perpage, perpage * (page - 1)])
    let totalCount = await getTotalCount(queryCategoryName)

    let result = {
        data: rows,
        totalCount: totalCount
    }
    //return client
    res.json(result)
}

let viewCategory = async (req, res) => {
    let id = req.params.id
    let [rows, fields] = await pool.execute('SELECT * FROM categories WHERE category_id = ?', [id])
    res.json(rows[0])

}
let createCategory = async (req, res) => {

    let { category_name } = req.body
    if (!validateCategoryName(category_name)) {
        return res.status(200).json({ 'error': 'unvalid' })

    }
    let creatAt = new Date()
    let updateAt = new Date()
    await pool.execute('INSERT INTO categories (category_name, create_at, update_at) VALUES (?,?,?)', [category_name, creatAt, updateAt])

    res.status(200).json({})
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
let validateCategoryName = (categoryName) => {

    if (categoryName.length >= 5) {
        return true
    }
    return false
}
export default {
    getCategory, viewCategory, createCategory, editCategory, deleteCategory
}