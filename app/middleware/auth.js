module.exports = {
  isLogin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash(
        "alertMessage",
        "Mohon maaf session anda telah berakhir, silahkan login kembali"
      );
      req.flash("alertStatus", "danger");
      res.redirect("/");
    } else {
      next();
    }
  },
  AdminAkses: (req, res, next) => {
    if (req.session.user.role === "admin") {
      return next();
    } else if (
      req.session.user.role === "user" ||
      req.session.user.role === "upg"
    ) {
      req.flash(
        "alertMessage",
        "Anda tidak ada hak untuk mengakses halaman ini"
      );
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUser");
    }
  },
  UPGAkses: (req, res, next) => {
    if (req.session.user.role === "upg") {
      return next();
    } else if (
      req.session.user.role === "user" ||
      req.session.user.role === "admin"
    ) {
      req.flash(
        "alertMessage",
        "Anda tidak ada hak untuk mengakses halaman ini"
      );
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUser");
    }
  },
  notUPGAkses: (req, res, next) => {
    if (req.session.user.role === "upg") {
      req.flash(
        "alertMessage",
        "Anda tidak ada hak untuk mengakses halaman ini"
      );
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUpg");
    } else {
      return next();
    }
  },
};
