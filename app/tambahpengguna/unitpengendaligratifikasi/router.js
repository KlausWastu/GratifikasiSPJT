var express = require("express");
var router = express.Router();
const { index, actionCreate } = require("./controller");
const { isLogin, AdminAkses } = require("../../middleware/auth");

router.use(isLogin);
router.get("/", AdminAkses, index);
router.post("/create", AdminAkses, actionCreate);
// router.post("/create", isAdmin, actionCreate);
// router.get("/edit/:id", viewEdit);
// router.put("/edit/:id", actionEdit);
// router.put("/status/:id", actionStatus);

module.exports = router;
