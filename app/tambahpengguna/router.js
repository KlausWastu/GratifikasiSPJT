var express = require("express");
var router = express.Router();
const {
  index,
  actionStatus,
  viewEdit,
  actionEdit,
  status,
} = require("./controller");
const { isLogin, AdminAkses } = require("../middleware/auth");

router.use(isLogin);
router.get("/", AdminAkses, index);
router.get("/edit/:id", AdminAkses, viewEdit);
router.put("/edit/:id", AdminAkses, actionEdit);
router.put("/status/:id", AdminAkses, status);

module.exports = router;
