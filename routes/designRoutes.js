import express from 'express'
import { getDesignDataByCategoryCode , save_design_to_cart, getCartById , updateCart } from '../controllers/designController.js'

const router = express.Router()

router.get('/get-properties',  getDesignDataByCategoryCode)
router.post('/addToCart' ,  save_design_to_cart)
router.get('/getCart/:cartId' , getCartById)
router.put('/updateCart/:cartId', updateCart)

export default router