import express from 'express'
import pool from '../../configs/connectDB.js'


let getTotalCount = async (queryProductName) => {
    const totalCountSql = `SELECT COUNT(*) AS totalCount FROM products
    WHERE product_name `+ queryProductName + `
     `
    let [rows, fields] = await pool.execute(totalCountSql)
    return rows[0].totalCount
}


let viewProduct = async (req, res) => {

    let id = req.params.id
    const sql = `
        SELECT
         p.product_name,
         p.description,
         p.price,
         p.quantity,
         c.category_name
        FROM products AS p
        INNER JOIN categories AS c ON p.category_id = c.category_id
        WHERE p.product_id = ?
    `
    let [rows, fields] = await pool.execute(sql, [id])

    res.json(rows[0])

}
let getProductByCategory = async (req, res) => {
    let id = req.params.id
    const sql = `SELECT product_name, description, price, quantity
    FROM products 
    WHERE category_id =?`
    let [rows, fields] = await pool.execute(sql, [id])
    res.json(rows)

}
let getProducts = async (req, res) => {
    //get query from request
    let { page, perpage, product_name } = req.query

    if (!page) {
        page = 1
    }
    if (!perpage) {
        perpage = 2
    }
    let queryProductName = "like '%" + product_name + "%'"
    if (!product_name) {
        queryProductName = '= product_name'
    }
    const sql = `
    SELECT * FROM products AS p
    INNER JOIN categories  AS c
    ON p.category_id = c.category_id
    WHERE product_name `+ queryProductName + `
    LIMIT ?
    OFFSET ?

    `
    let [rows, fields] = await pool.execute(sql, [perpage, perpage * (page - 1)])
    let totalCount = await getTotalCount(queryProductName)
    let result = {
        totalCount: totalCount,
        data: rows
    }

    res.json(result)
}
let editProduct = async (req, res) => {
    let id = req.params.id
    let { product_name, description, price, quantity } = req.body

    const sql = `
    UPDATE products 
    SET product_name =?, description=?, price =?, quantity=?
    WHERE product_id =?
    `
    let [rows, fields] = await pool.execute(sql, [product_name, description, price, quantity, id])
    res.status(200).json()
}

let createProduct = async (req, res) => {
    let { categoryId, productName, description, price, quantity } = req.body
    let create_at = new Date()
    let update_at = new Date()
    const sql = `
    INSERT INTO products 
    (product_name, description ,price , quantity, create_at, update_at, category_id)
    VALUES 
    (?,?,?,?,?,?,?)
    `
    let [rows, fields] = await pool.execute(sql, [productName, description, price, quantity, create_at, update_at, categoryId])
    res.status(200).json()
}
let deleteProduct = async (req, res) => {
    let id = req.params.id
    const sql = `
    DELETE FROM products
    WHERE product_id =?
    `
    let [rows, fields] = await pool.execute(sql, [id])
    res.status(200).json()
}
export default {
    viewProduct, getProducts, editProduct, createProduct, deleteProduct, getProductByCategory
}