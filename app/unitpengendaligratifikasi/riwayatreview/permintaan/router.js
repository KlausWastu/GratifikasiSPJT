var express = require("express");
var router = express.Router();
const { index } = require("./controller");

const { isLogin, UPGAkses } = require("../../../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", UPGAkses, index);

module.exports = router;
