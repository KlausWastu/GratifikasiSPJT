var express = require("express");
var router = express.Router();
const {
  view_Singin,
  actionSignin,
  Logout,
  viewUbahPass,
  actionUbahPass,
} = require("./controller");

/* GET home page. */
router.get("/", view_Singin);
router.post("/", actionSignin);
router.get("/logout", Logout);
router.get("/ubahpassword", viewUbahPass);
router.put("/ubah/:id", actionUbahPass);

module.exports = router;
