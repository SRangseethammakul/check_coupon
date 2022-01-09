const express = require("express");
const router = express.Router();
const dateController = require("../controllers/dateController");

router.get("/", dateController.index);
router.put("/:id", dateController.update);

module.exports = router;
