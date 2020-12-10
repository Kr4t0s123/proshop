import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import { deleteProduct, getProducts , getProductById , createProductReview , getTopProducts, updateProduct, createProduct} from '../controllers/productController.js'
const router  = express.Router();


router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect ,createProductReview)
router.get('/top' , getTopProducts)
router.route('/:id').get(getProductById).delete(protect , admin , deleteProduct).put(protect,admin,updateProduct)

export default router

