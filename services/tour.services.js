const Tour = require("../models/Tour");

// if we use sort 1 it will give us hight to low and if we use -1 it low to high
// single sort

// exports.getToursServices= async()=>{
//    const tour = await Tour.find({}).sort({price:-1})
//    return tour;
// }

// multiple sort

// exports.getToursServices= async()=>{
//    const tour = await Tour.find({}).sort('quantity price name')
//    return tour;
// }

// sort data with multi filds   assanding order sort low to high
// exports.getToursServices= async(filters, queries)=>{
//    const tour = await Tour.find({}).sort(queries.sortBy)
//    return tour;
// }

// sort and also fiend any fields

// exports.getToursServices = async (filters, queries) => {
//   const tour = await Tour.find({}).select(queries.fields).sort(queries.sortBy);
//   return tour;
// };

// see up to 50 tk price tour hard coded
// exports.getToursServices = async (filters, queries) => {
//   const tour = await Tour.find({price:{$gt:1000}})
//   .select(queries.fields)
//   .sort(queries.sortBy);
//   return tour;
// };
// dynamic to query price or any fileds
exports.getToursServices = async (filters, queries) => {
  const tour = await Tour.find(filters)
  .skip(queries.skip)
  .limit(queries.limit )
  .select(queries.fields)
  .sort(queries.sortBy)
  const toalTours = await Tour.countDocuments(filters)

  const pageCount = Math.ceil(toalTours / queries.limit)

  return {pageCount,toalTours,tour};
};

// exports.getToursServices= async(query)=>{
//    const tour = await Tour.find(query)
//    return tour;
// }

exports.createTourServices = async (data) => {
  const createtour = await Tour.create(data);
  return createtour;
};

exports.updateTourServicesById = async (tourId, data) => {
  const result = await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateTourServices = async (data) => {
  // console.log(data.ids, data)
  // many update same data
  // const result = await Tour.updateMany({ _id: data.ids}, data.data, {
  //     runValidators:true
  // })

  // many update defrent data

  const tours = [];

  data.ids.forEach((tour) => {
    tours.push(Tour.updateOne({ _id: tour.id }, tour.data));
  });

  const result = await Promise.all(tours);
  // console.log(result)
  return result;
};

exports.deleteTourByIdService = async (id) => {
  const result = await Tour.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteTourServices = async (ids) => {
  const result = await Tour.deleteMany({ _id: ids });
  return result;
};
