import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product_qty: {
        type: Number,
        required: true,
    },
    designId: {
        type : mongoose.ObjectId,
        required: true,
        ref: 'design'    
    },
    userId :{
        type : mongoose.ObjectId,
        required: true,
        ref: 'user'
    },
    categoryId : {
         type : mongoose.ObjectId,
         ref: 'category'
    }
  },
  { timestamps: true }
);

export default mongoose.model("cart", cartSchema);
