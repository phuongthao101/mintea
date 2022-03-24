import express from 'express'

const router = express.Router()

import userController from '../controllers/userController.js'
import categoryController from '../controllers/categoryController.js'
import homeController from '../controllers/homeController.js'

let initWebRoute = (app) => {

   router.get('/api/categories', categoryController.getCategory)
   router.get('/api/category/:id', categoryController.viewCategory )
   router.post('/api/category', categoryController.createCategory )
   router.put ('/api/category/:id', categoryController.editCategory )
   router.delete ('/api/category/:id', categoryController.deleteCategory )

   router.get('/', homeController.homePage)
  
  

   app.use('/', router)
}
export default initWebRoute