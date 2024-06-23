import express from 'express'
import { getDesignDataByCategoryCode , save_design_to_cart} from '../controllers/designController.js'

const router = express.Router()

router.get('/get-properties',  getDesignDataByCategoryCode)
router.post('/addToCart' ,  save_design_to_cart)

export default router