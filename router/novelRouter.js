const express = require("express");
const router = express.Router();
//#region Controller
const { index, show , create, updated, deleted, findByType } = require("../controller/novelController");
//#endregion


router.route("/").get(index).post(create);
router.route("/:id").get(show).put(updated).delete(deleted);
router.route("/type/:type").get(findByType);
module.exports = router;