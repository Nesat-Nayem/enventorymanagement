const Tour = require('../models/Tour')


exports.getToursServices= async()=>{
   const tour = await Tour.find({})
   return tour;
}

exports.createTourServices = async(data)=>{
    const createtour = await Tour.create(data);
    return createtour
}