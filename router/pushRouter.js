const express = require("express");
const router = express.Router();

const { sendToAll, sendToId } = require("../controller").pushController;

router.post("/send-to-all", sendToAll);
router.post("/send-to-id/:id", sendToId);

module.exports = router;
