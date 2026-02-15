// require("dotenv").config();
// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");


// const MONGO_URL = process.env.ATLASDB_URL;


// console.log("Mongo URL:", MONGO_URL);

// main()
// .then(()=>{
//     console.log("connected to DB");    
// }).catch(err=>{
//   console.log(err);
// });

// async function main(){
//     await  mongoose.connect(MONGO_URL);
// }

// const initDB = async () =>{
//    await Listing.deleteMany({});
//    initData.data = initData.data.map((obj)=>({...obj, owner:"68ff2b88657bfc98003b9abd"}))
//    await Listing.insertMany(initData.data);
//    console.log("data was initialized");
// };

// initDB();

require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listings = initData.data.map((obj) => ({
    ...obj,
    owner: "68ff2b88657bfc98003b9abd",
    geometry: {
      type: "Point",
      coordinates: [77.1025, 28.7041],
    },
  }));

  await Listing.insertMany(listings);
  console.log("data was initialized");
};

main()
  .then(initDB)
  .catch((err) => console.log(err));
