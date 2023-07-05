var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const userRouter = require("./app/user/router");

const dasboardUpgRouter = require("./app/dashboardUpg/router");
const dasboardUserRouter = require("./app/dashboardUser/router");

const laporRouter = require("./app/lapor/router");
const laporPenerimaanRouter = require("./app/lapor/laporpenerimaan/router");
const laporPenolakanRouter = require("./app/lapor/laporpenolakan/router");
const laporPermintaanRouter = require("./app/lapor/laporpermintaan/router");

const riwayatPenerimaanRouter = require("./app/riwayatLaporan/penerimaan/router");
const riwayatPenolakanRouter = require("./app/riwayatLaporan/penolakan/router");
const riwayatPermintaanRouter = require("./app/riwayatLaporan/permintaan/router");

const tambahpenggunaRouter = require("./app/tambahpengguna/router");
const tambahuserRouter = require("./app/tambahpengguna/user/router");
const tambahupgRouter = require("./app/tambahpengguna/unitpengendaligratifikasi/router");

const laporanMasukPenerimaanRouter = require("./app/unitpengendaligratifikasi/laporanmasuk/penerimaan/router");
const laporanMasukPenolakanRouter = require("./app/unitpengendaligratifikasi/laporanmasuk/penolakan/router");
const laporanMasukPermintaanRouter = require("./app/unitpengendaligratifikasi/laporanmasuk/permintaan/router");

const riwayatReviewedPenerimaanRouter = require("./app/unitpengendaligratifikasi/riwayatreview/penerimaan/router");
const riwayatReviewedPenolakanRouter = require("./app/unitpengendaligratifikasi/riwayatreview/penolakan/router");
const riwayatReviewedPermintaanRouter = require("./app/unitpengendaligratifikasi/riwayatreview/permintaan/router");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(flash());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte"))
);

app.use("/", userRouter);
app.use("/dashboardUser", dasboardUserRouter);
app.use("/dashboardUpg", dasboardUpgRouter);

// Lapor
app.use("/lapor", laporRouter);
app.use("/laporPenerimaan", laporPenerimaanRouter);
app.use("/laporPenolakan", laporPenolakanRouter);
app.use("/laporPermintaan", laporPermintaanRouter);

// Riwayat Laporan
app.use("/riwayatPenerimaan", riwayatPenerimaanRouter);
app.use("/riwayatPenolakan", riwayatPenolakanRouter);
app.use("/riwayatPermintaan", riwayatPermintaanRouter);

// Tambah Pengguna
app.use("/tambahPengguna", tambahpenggunaRouter);
app.use("/tambahUser", tambahuserRouter);
app.use("/tambahUpg", tambahupgRouter);

// Laporan Masuk (Unit Pengendali Gratifikasi)
app.use("/masukPenerimaan", laporanMasukPenerimaanRouter);
app.use("/masukPenolakan", laporanMasukPenolakanRouter);
app.use("/masukPermintaan", laporanMasukPermintaanRouter);

// Riwayat Reviewed UPG
app.use("/riwayatReviewedPenerimaan", riwayatReviewedPenerimaanRouter);
app.use("/riwayatReviewedPenolakan", riwayatReviewedPenolakanRouter);
app.use("/riwayatReviewedPermintaan", riwayatReviewedPermintaanRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
