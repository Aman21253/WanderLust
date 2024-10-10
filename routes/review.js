const express=require("express");
// When we send review then id is not going anywhere so we use merge params. doc(express router)
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviwAuthor }=require("../middleware.js");

const reviewController= require("../controllers/reviews.js");

//post Review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
  
//Delete review route
router.delete("/:reviewId",isLoggedIn,isReviwAuthor,wrapAsync(reviewController.destroyReview));

module.exports= router;