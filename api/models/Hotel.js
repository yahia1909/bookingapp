import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },

  type:{
    type:String,
    required:true
  },

  city:{
    type:String,
    required:true
  },

  address:{
    type:String
  },

  photos:{
    type:Array
  },

  distance:{
    type:String
  },

  desc:{
    type:String
  },

  cheapestPrice:{
    type:Number,
    required:true
  },

  featured:{
    type:Boolean,
    default:false
  },


  rooms:[
    {
      number:{
        type:Number,
        required:true
      },

      price:{
        type:Number,
        required:true
      }
    }
  ]


},
{
 timestamps:true
}
);


export default mongoose.model("Hotel",HotelSchema);