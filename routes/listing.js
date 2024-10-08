const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing, isReviwAuthor}=require("../middleware.js");

//Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
  })
);
  
//New Route
router.get("/new", isLoggedIn,(req, res) => {
  res.render("listings/new.ejs");
});
  
//Show Route
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id)
        .populate(
          {
            path:"reviews",
            populate:{
              path:"author"
            }
          })
          .populate("owner");
        if(!listing){
          req.flash("error","Not existed");
          res.redirect("/listings");
        }
        res.render("listings/show.ejs", { listing });
  })
);
  
//Create Route
router.post(
    "/",isLoggedIn,
    isReviwAuthor,
    validateListing,
    wrapAsync(async (req, res,next) => {
      const listingData = req.body.listing;
      const newListing = new Listing(listingData); // Create a new instance of the model
      console.log(req.user);
      newListing.owner=req.user._id;
      await newListing.save(); // Save to the database
      req.flash("success","New listing registered");
      res.redirect("/listings");
    })
);
  
//Edit Route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
          req.flash("error","Not existed");
          res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
  })
);
  
//Update Route
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success","Listing updated");
        res.redirect(`/listings/${id}`);
  })
);
  
//Delete Route
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success","Listing deleted");
        res.redirect("/listings");
  })
);

module.exports=router;