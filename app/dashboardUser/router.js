var express = require("express");
var router = express.Router();
const { index } = require("./controller");

const { isLogin, notUPGAkses } = require("../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", notUPGAkses, index);

module.exports = router;
