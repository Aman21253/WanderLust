//joi to validate our schema(server side)
const { text } = require("express");
const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
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
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          : v,
    // You can add more fields for image, like 'alt' text, etc. if needed
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
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
