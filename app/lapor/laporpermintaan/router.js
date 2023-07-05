var express = require("express");
var router = express.Router();
const {
  viewDataPenerima,
  viewDataPeminta,
  viewUraianPermintaan,
  actionLaporPermintaan,
} = require("./controller");
const { isLogin } = require("../../middleware/auth");
const multer = require("multer");
const os = require("os");

router.use(isLogin);
/* GET home page. */
router.get("/", viewDataPenerima);
router.get("/datapeminta", viewDataPeminta);
router.get("/uraianpermintaan", viewUraianPermintaan);
router.post(
  "/uraianpermintaan",
  multer({ dest: os.tmpdir(), limits: { fileSize: 2097152 } }).single(
    "uploaddokumen"
  ),
  actionLaporPermintaan
);

module.exports = router;
