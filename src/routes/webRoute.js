import express from 'express'
const router = express.Router()

import categoryAPIController from '../controllers/API/categoryController.js'
import homeController from '../controllers/homeController.js'
import categoryController from '../controllers/categoryController.js'

let initWebRoute = (app) => {

   router.get('/api/categories', categoryAPIController.getCategory)
   router.get('/api/category/:id', categoryAPIController.viewCategory)
   router.post('/api/category', categoryAPIController.createCategory)
   router.put('/api/category/:id', categoryAPIController.editCategory)
   router.delete('/api/category/:id', categoryAPIController.deleteCategory)

   router.get('/', homeController.homePage)
   router.get('/category', categoryController.categoryPage)


   app.use('/', router)
}
export default initWebRoute