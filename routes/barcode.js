const express = require("express");
const router = express.Router();
const barcodeController = require("../controllers/barcodeController");

router.get("/", barcodeController.index);
router.get("/checkdate", barcodeController.show);

module.exports = router;
