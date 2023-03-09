const express = require("express");
const userController = require("../controllers/userController");
const propertyController = require("../controllers/propertyController");
const propertyTypeController = require("../controllers/propertyType");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const auth = require("../middleware/auth")

const router = express.Router();


//user routes

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

//property routes

router.post("/addproperty" , upload.array("image"), propertyController.addProperty);
router.get("/properties", propertyController.getProperties);
router.post("/addPropertyType", propertyTypeController.addPropertyType);
router.get("/getPropertyType", propertyTypeController.getPropertyType);

module.exports = router;
