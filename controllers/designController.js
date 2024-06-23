import  Design from "../models/design.js";
import Category from "../models/CategoryModel.js";
import Material from "../models/material.js";
import Color  from "../models/color.js"
import Part from '../models/part.js'
import Size from '../models/size.js'
import User from '../models/userModel.js'
import Cart from "../models/cart.js";
import JWT from 'jsonwebtoken'

// all Materials , colors , parts , Size
export const getDesignDataByCategoryCode = async (req, res) => {
    try {
       
       const getCategory = await Category.findOne({ code : req.query.code })
       const getMaterials = await Material.find()
       const getColors = await Color.find()
       const getParts = await Part.find()
       const getSizes = await Size.find()

       return res.status(200).json({
           success : true,
           message : "design fetched",
           category : getCategory,
           materials : getMaterials,
           colors : getColors,
           sizes : getSizes,
           parts : getParts 
       })    
    }
    catch {
        console.log(error);
        return res.status(500).send({
        success: false,
        message: "Eror while getitng design",
        error,
    });
    }
         
}

export const save_design_to_cart  = async(req, res) => {
    try{
        const { token } = req.query

        const decode = await JWT.verify(token , process.env.JWT_SECRET ,{
            complete: true,
            algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false,
        })

        let userId  = decode.payload.userId
    
        const findUser = await User.findById(userId)

        if(!findUser) {
            return res.status(404).json({
                success : 'false',
                message  : "user doesn't exist"  
             })
        }
        
       const { categoryCode , product_qty, ...rest } = req.body
       
       const findCategory = await Category.findOne({ code : categoryCode})

       if(!findCategory) {
          return res.status(404).json({
             success : 'false',
             message  : 'failed to fetch category'  
          })
       }

       const save_design = await Design.create({
         userId , 
         categoryCode , 
         ...rest
       })


       const addTocart  = await Cart.create({
        userId,
        categoryId : findCategory._id,
        designId :  save_design._id,
        product_qty
       })
        
       console.log(addTocart)
       return res.status(200).json({
        success: 'true',
        message : 'add to cart' ,
       })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
        success: false,
        message: "Eror while saving design",
        error,
    });
    }
}