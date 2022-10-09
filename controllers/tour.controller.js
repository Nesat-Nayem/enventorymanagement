// const Tour = require('../models/Tour')

const { getToursServices, createTourServices } = require("../services/tour.services")

exports.getTours = async(req,res,next)=>{
    try {
      // const tour = await Tour.find({_id:"63425d7f27e53f1338106cd7", placeName: 'test dplf4hace1'}) // it's and operator for get
  
      // const tour = await Tour.find({ $or:[{_id:'63425d7f27e53f1338106cd7'}, {name:'test dplf4hace1'}]}) // it's or operator for get data
  
      // const tour = await Tour.find({ status: { $ne: "evailable" } }) // it's men status without evailable other show not show status enailable
  
      // const tour = await Tour.find({ quantity: { $gt: 100 } }) // it's men getter then value given and lt means less then  and getter then equal gte
  
      // const tour = await Tour.find({ placeName: { $in: ['london trip', 'new yourk'] } }) //in operator spacific any fild search
  
      // only name and price 
      // const tour = await Tour.find({}, 'placeName price') //projection it's mean spacific any fild
  // without name and price 
      // const tour = await Tour.find({}, '-placeName -price')
  
      // use limited get 
      // const tour = await Tour.find({}).limit(3)
  
      // use sort for large to small for minus - and plus + for small to learge 
      // const tour = await Tour.find({}).sort({quantity:-1})
  
      // select for just only placename 
      // const tour = await Tour.find({}).select({placeName:1})
  
      // use one time many method 
      // const tour = await Tour.where('placeName').equals('hawai').where('quantity').gt(10)
      // const tour = await Tour.where('placeName').equals(/\W/)
      // .where('quantity').gt(10)
      // .limit(3).sort({quantity:-1})
  
  // find a spacific id
  
    //   const tour = await Tour.findById("63423b1656ac7f2ad4b29120")
      const tours = await getToursServices()
  
  
      res.status(200).json({
        status:"success",
        message:'data get successfully',
        data: tours
       })
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
        error: error.message
      })
    }
  }

  exports.createTours = async(req, res, next)=>{
    // we can do data save to way  like save or create
    // screma -> model ->query
    
    try {
    
      // save method 
    //   const tour =  new Tour(req.body)
    
      // if(tour.quantity === 0){
      //   tour.status = "discontinue"
      // }
     const result = await createTourServices(req.body)
    
    // crate method 
    
    
      // const result = await Tour.create(req.body)
    
    
    
     res.status(200).json({
      status:"success",
      message:'data insert successfully',
      data: result
     })
    
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "data not inserted",
        error: error.message
      })
      
    }
    
    
    
    }