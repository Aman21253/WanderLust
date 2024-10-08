const express=require("express");
// When we send review then id is not going anywhere so we use merge params. doc(express router)
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const Review=require("../models/review.js");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviwAuthor }=require("../middleware.js");


//post Review route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(async (req,res)=>{
        let listing = await Listing.findById(req.params.id);
        let newReview=new Review(req.body.review);
        newReview.author = req.user._id;

        listing.reviews.push(newReview);
  
        await newReview.save();
        await listing.save();
        req.flash("success","Review added");
        res.redirect(`/listings/${listing._id}`);
    })
);
  
//Delete review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviwAuthor,
    wrapAsync(async (req, res) => {
    let { id,reviewId } = req.params;
    let deletedListing = await Review.findByIdAndDelete(id);
  
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
  })
);

module.exports= router;