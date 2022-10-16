// const Tour = require('../models/Tour')

const {
  getToursServices,
  createTourServices,
  updateTourServicesById,
  bulkUpdateTourServices,
  bulkDeleteTourServices,
  deleteTourByIdService,
} = require("../services/tour.services");

// exports.getTours = async (req, res, next) => {
//   try {
//     // it's and operator for get
//     // const tour = await Tour.find({_id:"63425d7f27e53f1338106cd7", placeName: 'test dplf4hace1'}) 
    
//     // it's or operator for get data

//     // const tour = await Tour.find({ $or:[{_id:'63425d7f27e53f1338106cd7'}, {name:'test dplf4hace1'}]}) 

//     // const tour = await Tour.find({ status: { $ne: "evailable" } }) // it's men status without evailable other show not show status enailable

//     // const tour = await Tour.find({ quantity: { $gt: 100 } }) // it's men getter then value given and lt means less then  and getter then equal gte

//     // const tour = await Tour.find({ placeName: { $in: ['london trip', 'new yourk'] } }) //in operator spacific any fild search

//     // only name and price
//     //projection it's mean spacific any fild
//     // const tour = await Tour.find({}, 'placeName price') 
//     // without name and price
//     // const tour = await Tour.find({}, '-placeName -price')

//     // use limited get
//     // const tour = await Tour.find({}).limit(3)

//     // use sort for large to small for minus - and plus + for small to learge
//     // const tour = await Tour.find({}).sort({quantity:-1})

//     // select for just only placename
//     // const tour = await Tour.find({}).select({placeName:1})

//     // use one time many method
//     // const tour = await Tour.where('placeName').equals('hawai').where('quantity').gt(10)
//     // const tour = await Tour.where('placeName').equals(/\W/)
//     // .where('quantity').gt(10)
//     // .limit(3).sort({quantity:-1})

//     // find a spacific id

//     //   const tour = await Tour.findById("63423b1656ac7f2ad4b29120")
//     // const tours = await getToursServices();

//     // query 
//     console.log(req.query)
//     const tours = await getToursServices(req.query);

//     res.status(200).json({
//       status: "success",
//       message: "data get successfully",
//       data: tours,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "data not found",
//       error: error.message,
//     });
//   }
// };

// video 7/4 query 

exports.getTours = async (req, res, next) => {
  try {
      let filters = {... req.query};
    console.log(filters)
    // sort , page , limit -> exclude
    const excludefilds = ['sort', 'page', 'limit'] 
    excludefilds.forEach(field => delete filters[field])
    // query 
    // console.log(req.query)
    // console.log('orginal object', req.query);
    // console.log('query object', queryObjects)

    // gt lt gte lte 

    let filterString = JSON.stringify(filters)

    filterString = filterString.replace( /\b(gt|lt|gte|lte)\b/g , match=>`$${match}`)
    filters = JSON.parse(filterString)

    const queries = {}

    if(req.query.sort){
      // price, quantity -> 'price quantity'  
      const sortBy = req.query.sort.split(',').join(' ')
      queries.sortBy = sortBy;
      console.log(sortBy)
    }
// comma to space
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ')
      queries.fields = fields;
      console.log(fields)
    }


    if(req.query.page){

      const {page=1 , limit=10 } = req.query 

      const skip = (page - 1)*parseInt(limit)

      queries.skip = skip;
      queries.limit = parseInt(limit);

    }


    const tours = await getToursServices(filters, queries);

    res.status(200).json({
      status: "success",
      message: "data get successfully",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data not found",
      error: error.message,
    });
  }
};



exports.createTours = async (req, res, next) => {
  // we can do data save to way  like save or create
  // screma -> model ->query

  try {
    // save method
    //   const tour =  new Tour(req.body)

    // if(tour.quantity === 0){
    //   tour.status = "discontinue"
    // }
    const result = await createTourServices(req.body);

    // crate method

    // const result = await Tour.create(req.body)

    res.status(200).json({
      status: "success",
      message: "data insert successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data not inserted",
      error: error.message,
    });
  }
};


exports.updateTourById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await updateTourServicesById(id,req.body); 
        res.status(200).json({
            status:'success',
            message:'data updated successfuly',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "data not updated",
            error: error.message,
          });
    }
}
exports.bulkUpdateTour = async(req,res,next)=>{
  // console.log('from controller', req.body)
    try {
        const result = await bulkUpdateTourServices(req.body); 
        res.status(200).json({
            status:'success',
            message:'data updated successfuly'  
            // data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "data not updated",
            error: error.message,
          });
    }
}
exports.deleteTourById = async(req,res,next)=>{
  // console.log('from controller', req.body)
    try {
      const {id} = req.params; 
        const result = await deleteTourByIdService(id);

       if(!result.deletedCount ){
        return res.status(4000).json({
          status:"fail",
          error:"not deleted"
        })
       }

        res.status(200).json({
            status:'success',
            message:'data deleted successfuly'  
            // data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "data not deleted",
            error: error.message,
          });
    }
}

exports.bulkDeleteTour = async(req,res,next)=>{
  // console.log('from controller', req.body)
    try {
        const result = await bulkDeleteTourServices(req.body.ids); 
        res.status(200).json({
            status:'success',
            message:'successfuly deleted given tour'  
            // data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't delete given tour",
            error: error.message,
          });
    }
}