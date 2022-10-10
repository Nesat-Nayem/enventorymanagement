const Tour = require('../models/Tour')


exports.getToursServices= async()=>{
   const tour = await Tour.find({})
   return tour;
}

exports.createTourServices = async(data)=>{
    const createtour = await Tour.create(data);
    return createtour
}

exports.updateTourServices = async(tourId,data)=>{
    
    const result = await Tour.updateOne({_id : tourId},   {$set: data}, {runValidators:true})
    return result;

}

exports.bulkUpdateTourServices = async(data)=>{
    // console.log(data.ids, data)  
    // many update same data
    // const result = await Tour.updateMany({ _id: data.ids}, data.data, {
    //     runValidators:true
    // })

    // many update defrent data 

    const tours = [];

    data.ids.forEach(tour => {
        tours.push(Tour.updateOne({ _id : tour.id }, tour.data))
    });

    const result = await Promise.all(tours); 
console.log(result)
    return result;
}