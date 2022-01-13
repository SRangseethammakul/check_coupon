const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.index);
router.post("/", transactionController.insert);
router.get("/cleardata", transactionController.clearData);
router.get("/checklimittoday", transactionController.checkLimitToday);

module.exports = router;
