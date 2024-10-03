const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {listingSchema}=require("../schema.js");
const Listing = require("../models/listing");
const ExpressError= require("../utils/expressError.js");

const validateListing=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
      }else{
        next();
      }
  };

//Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
  })
);
  
//New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});
  
//Show Route
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        res.render("listings/show.ejs", { listing });
  })
);
  
//Create Route
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res,next) => {
      const listingData = req.body.listing;
      const newListing = new Listing(listingData); // Create a new instance of the model
      await newListing.save(); // Save to the database
      res.redirect("/");
    })
);
  
//Edit Route
router.get(
    "/:id/edit", 
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("listings/edit.ejs", { listing });
  })
);
  
//Update Route
router.put(
    "/:id", 
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
  })
);
  
//Delete Route
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/");
  })
);

module.exports=router;