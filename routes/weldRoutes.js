const express = require("express");
const router = express.Router();

const {
  getAllWelds,
  getSingleWeld,
  updateWeld,
  deleteWeld,
  createWeld,
} = require("../controller/weldController");

router.route("/").get(getAllWelds).post(createWeld);

router.route("/:id").get(getSingleWeld).post(updateWeld).delete(deleteWeld);

module.exports = router;
