const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");

const listingControllers=require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

router
    .route("/")
    .get(wrapAsync(listingControllers.index)) //Index Route
    //.post(isLoggedIn, validateListing, wrapAsync(listingControllers.createForm)); //Create Route
    .post(upload.single('listing[image]'),(req,res)=>{
        res.send(req.file);
    })

//New Route
router.get("/new",isLoggedIn, listingControllers.newForm);

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

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.editForm));

module.exports=router;