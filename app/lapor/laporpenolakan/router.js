var express = require("express");
var router = express.Router();
const {
  viewDataPenerima,
  viewDataPemberi,
  actionLaporPenolakan,
  viewUraianPenolakan,
} = require("./controller");
const { isLogin } = require("../../middleware/auth");
const multer = require("multer");
const os = require("os");

router.use(isLogin);
/* GET home page. */
router.get("/", viewDataPenerima);
router.get("/datapemberi", viewDataPemberi);
router.get("/uraianpenolakan", viewUraianPenolakan);
router.post(
  "/uraianpenolakan",
  multer({ dest: os.tmpdir(), limits: { fileSize: 2097152 } }).single(
    "uploaddokumen"
  ),
  actionLaporPenolakan
);

module.exports = router;
