const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");

const listingControllers=require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingControllers.index)) //Index Route
    .post(isLoggedIn, validateListing, wrapAsync(listingControllers.createForm)); //Create Route


router.route("/:id")
.get(wrapAsync(listingControllers.showForm))
.put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingControllers.updateForm)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.deleteForm)
);

//New Route
router.get("/new",isLoggedIn, listingControllers.newForm);

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.editForm));

module.exports=router;