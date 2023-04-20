const express = require("express");
const router = express.Router();
//#region Controller
const { index, show , create, updated, deleted, findByNovelId } = require("../controller/commentController");
//#endregion


router.route("/").get(index).post(create);
router.route("/:id").get(show).put(updated).delete(deleted);
router.route("/novel/:id").get(findByNovelId);
module.exports = router;