const express = require("express");
const router = express.Router();
//#region Controller
const { index, show , create, updated, deleted, findByNovelId, findByCateNovel, findByPageNumBer, findByNovelIdCount } = require("../controller/chapterController");
//#endregion


router.route("/").get(index).post(create);
router.route("/:id").get(show).put(updated).delete(deleted);
router.route("/novel/:id").get(findByNovelId);
router.route("/chapters/novel").get(findByCateNovel);
router.route("/page/:id/:pageNumber").get(findByPageNumBer);
router.route("/count/:id").get(findByNovelIdCount);
module.exports = router;