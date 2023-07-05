var express = require("express");
var router = express.Router();
const { index, preview } = require("./controller");
const { isLogin } = require("../../middleware/auth");
router.use(isLogin);
/* GET home page. */
router.get("/", index);
router.get("/preview/:id", preview);

module.exports = router;
