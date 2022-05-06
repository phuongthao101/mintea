import express from 'express'
const router = express.Router()

import categoryAPIController from '../controllers/API/categoryController.js'
import homeController from '../controllers/homeController.js'
import categoryController from '../controllers/categoryController.js'
import productController from '../controllers/productController.js'
import productAPIController from '../controllers/API/productController.js'
import userAPIController from '../controllers/API/userController.js'
import userController from '../controllers/userController.js'
import midleware, { ROLE } from '../midleware/authen.js'

let initWebRoute = (app) => {
   // APIs
   router.get('/api/categories', midleware.role(ROLE.admin, ROLE.viewer), categoryAPIController.getCategory)
   router.get('/api/category/:id', midleware.role(ROLE.admin, ROLE.viewer), categoryAPIController.viewCategory)
   router.post('/api/category', midleware.role(ROLE.admin), categoryAPIController.createCategory)
   router.put('/api/category/:id', midleware.role(ROLE.admin), categoryAPIController.editCategory)
   router.delete('/api/category/:id', midleware.role(ROLE.admin), categoryAPIController.deleteCategory)
   // router.delete('/api/category/:id',
   // midleware.req({

   //    reqLogin: true,
   //    reqAdmin: true
   // }), categoryAPIController.deleteCategory)

   // router.delete('/api/category/:id',midleware.role(ROLE.admin,ROLE.viewer), categoryAPIController.deleteCategory)


   router.get('/api/product/:id', midleware.role(ROLE.admin), productAPIController.viewProduct)
   router.get('/api/products', midleware.role(ROLE.admin, ROLE.viewer), productAPIController.getProducts)
   router.put('/api/product/:id', midleware.role(ROLE.admin), productAPIController.editProduct)
   router.post('/api/product', midleware.role(ROLE.admin), productAPIController.createProduct)
   router.delete('/api/product/:id', midleware.role(ROLE.admin), productAPIController.deleteProduct)
   router.get('/api/category/product/:id', midleware.role(ROLE.admin), productAPIController.getProductByCategory)

   router.post('/api/login', userAPIController.login)
   router.post('/api/register', userAPIController.register)
   router.get('/api/logout', userAPIController.logout)

   router.get('/api/roles', userAPIController.getRoles)

   //Pages 
   router.get('/', midleware.role(ROLE.admin, ROLE.viewer), homeController.homePage)
   router.get('/category', midleware.role(ROLE.admin, ROLE.viewer), categoryController.categoryPage)
   router.get('/product', midleware.role(ROLE.admin, ROLE.viewer), productController.productPage)
   router.get('/login', userController.loginPage)
   router.get('/register', userController.registerPage)
   router.get('/category/product/:id', midleware.role(ROLE.admin, ROLE.viewer), categoryController.productByCategoryPage)
   router.get('/404', homeController.errorPage)

   app.use('/', router)

}
export default initWebRoute