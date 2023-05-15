const express = require("express");
const router = express.Router();
//#region Controller
const { index, show , create, updated, deleted } = require("../controller/reportController");
//#endregion


router.route("/").get(index).post(create);
router.route("/:id").get(show).put(updated).delete(deleted);
module.exports = router;