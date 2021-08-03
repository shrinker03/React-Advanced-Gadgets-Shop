import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProductById, updateProduct, createProduct, createProductReview, getTopRatedProducts } from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.get('/top', getTopRatedProducts)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProductById)
    .put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)    
export default router