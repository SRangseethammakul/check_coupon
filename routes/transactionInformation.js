const express = require("express");
const router = express.Router();
const transactionInformationController = require("../controllers/transactionInformationController");

router.get("/", transactionInformationController.index);
router.get("/countperdate", transactionInformationController.countNumberPerDate);
router.get("/countperbu", transactionInformationController.countNumberPerBU);
router.get("/searchByDate", transactionInformationController.searchByDate);

module.exports = router;
