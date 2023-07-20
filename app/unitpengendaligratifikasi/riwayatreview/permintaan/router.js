var express = require("express");
var router = express.Router();
const { index, downloadPDFView } = require("./controller");

const { isLogin, UPGAkses } = require("../../../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", UPGAkses, index);
router.get("/down/:id", UPGAkses, downloadPDFView);

module.exports = router;
