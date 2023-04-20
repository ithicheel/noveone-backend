const express = require("express");
const router = express.Router();
//#region Controller
const {
  index,
  show,
  create,
  updated,
  deleted,
  register,
  login,
} = require("../controller/userController");
const { checkToken, checkAdminToken } = require("../auth/authorization");
//#endregion

router
  .route("/")
  .get(checkToken, checkAdminToken, index)
  .post(checkToken, checkAdminToken, create);
router
  .route("/:id")
  .get(checkToken, checkAdminToken, show)
  .put(checkToken, checkAdminToken, updated)
  .delete(checkToken, checkAdminToken, deleted);
// Addition
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
