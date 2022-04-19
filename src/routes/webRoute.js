import express from 'express'
const router = express.Router()

import categoryAPIController from '../controllers/API/categoryController.js'
import homeController from '../controllers/homeController.js'
import categoryController from '../controllers/categoryController.js'
import productController from '../controllers/productController.js'
import productAPIController from '../controllers/API/productController.js'
import userAPIController from '../controllers/API/userController.js'
import userController from '../controllers/userController.js'

let initWebRoute = (app) => {

   router.get('/api/categories', categoryAPIController.getCategory)
   router.get('/api/category/:id', categoryAPIController.viewCategory)
   router.post('/api/category', categoryAPIController.createCategory)
   router.put('/api/category/:id', categoryAPIController.editCategory)
   router.delete('/api/category/:id', categoryAPIController.deleteCategory)

   router.get('/api/product/:id', productAPIController.viewProduct)
   router.get('/api/products', productAPIController.getProducts)
   router.put('/api/product/:id', productAPIController.editProduct)
   router.post('/api/product', productAPIController.createProduct)
   router.delete('/api/product/:id', productAPIController.deleteProduct)

   router.post('/api/login', userAPIController.login)
   router.post('/api/register', userAPIController.register)

   router.get('/', homeController.homePage)
   router.get('/category', categoryController.categoryPage)
   router.get('/product', productController.productPage)
   router.get('/login', userController.loginPage)
   router.get('/register', userController.registerPage)


   app.use('/', router)
}
export default initWebRoute