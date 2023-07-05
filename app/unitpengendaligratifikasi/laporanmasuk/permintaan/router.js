var express = require("express");
var router = express.Router();
const { index, review, actionReview } = require("./controller");

const { isLogin, UPGAkses } = require("../../../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", UPGAkses, index);
router.get("/review/:id", UPGAkses, review);
router.put("/reviewed/:id", UPGAkses, actionReview);

module.exports = router;
