const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

// middleware 
app.use(express.json());
app.use(cors());

// schema design
const tourSchema = mongoose.Schema({
  placeName: {
    type: String,
    required: [true, "please provide your tour place."],
    trim: true, // it remove all unneeded  spacing 
    unique: [true, "Name must be unique"],
    minLength: [3, "place name must be up to 3 charactres "],
    maxLength: [100, "name is too large."]
  },
  descripttion:{
    type: String,
    required: true
  },
  price:{
    type:Number,
    required: true,
    min: [0,"price can't be negative."]
  },
  unit:{
    type: String,
    required:true,
    enum:{
      value: ["kg","liter","pcs"],
      message: "unit value can't be {VALUE}, must be kg/liter/pcs"
    }
  },
  quantity:{
    type: Number,
    required: true,
    min: [0,"quantity can't be negative."],
    validate:{
      validator:(value)=>{
      const isInteger = Number.isInteger(value);
      if(isInteger){
        return true
      }else{
        return false 
      }
      }
    },
    message: "quantity must integer"
  },
  status:{
    type: String,
    required:true,
    enum:{
      value : ["evailable", "unabailable", "discontinue"],
      message: "status must be {VALUE}, like inavailable/ unabailable/ discontinue"
    }
  },
  // createdAt:{
  //   type: Date,
  //   default : Date.now,
  // },
  // updatedAt:{
  //   type: Date,
  //   default:Date.now,

  // },
  supplier:{
    type: mongoose.Schema.Types.ObjectId, // if needed object id types follow it
    ref: "supplier"  // schema or model to model connect with repfance or ref
  },
  category:[{
    name: {
      type: String,
      required: true
    },
    _id: mongoose.Schema.Types.ObjectId
  }],
  timestamps:true,
  // _id: false //if we not needed _id then use it 
})







app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
