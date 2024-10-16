//joi to validate our schema(server side)
const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,  // Make it required as per sample
    maxlength: 500,  // Optional: Limit the description length if needed
  },
  image: {
      url:String,
      filename:String,
  },
  price: {
    type: Number,
    required: true,  // Make it required as per sample
    min: 0,  // Optional: Price cannot be negative
  },
  location: {
    type: String,
    required: true,  // Make it required as per sample
  },
  country: {
    type: String,
    required: true,  // Make it required as per sample
  },
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:'Review',
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  category:{
    type:String,
    enum:["Desert","Rooms","Hotel","View","Camping","Top-cities","Arctic","Play","Ski-in/out","Iconic-city"],
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({reviews: {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
