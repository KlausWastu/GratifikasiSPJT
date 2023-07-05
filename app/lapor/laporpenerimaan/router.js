var express = require("express");
var router = express.Router();
const {
  viewDataPenerima,
  viewDataPemberi,
  viewUraianPenerimaan,
  actionLaporPenerimaan,
} = require("./controller");
const { isLogin } = require("../../middleware/auth");
const multer = require("multer");
const os = require("os");

router.use(isLogin);
/* GET home page. */
router.get("/", viewDataPenerima);
router.get("/datapemberi", viewDataPemberi);
router.get("/uraianpenerimaan", viewUraianPenerimaan);
router.post(
  "/uraianpenerimaan",
  multer({ dest: os.tmpdir(), limits: { fileSize: 2097152 } }).single(
    "uploaddokumen"
  ),
  actionLaporPenerimaan
);

module.exports = router;
