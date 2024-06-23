import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    id: { type : Number , unique : true }, 
    name: { type : String , unique : true}, 
    code: { type : String , unique : true},
  },
  { timestamps: true }
);

export default mongoose.model("color", colorSchema);
