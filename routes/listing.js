const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");

//Multer and cloudinary is used for file and storing resp.
//npm i cloudinary multer-storage-cloudinary
const listingControllers=require("../controllers/listings.js");
const {storage}=require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingControllers.index)) //Index Route
    .post(
        isLoggedIn, 
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingControllers.createForm)); //Create Route

//New Route
router.get("/new",isLoggedIn, listingControllers.newForm);

// router.get("/search",isLoggedIn, listingControllers.search)

router.route("/:id")
.get(wrapAsync(listingControllers.showForm))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.updateForm)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.deleteForm)
);

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.editForm));

module.exports=router;