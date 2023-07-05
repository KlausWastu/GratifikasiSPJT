const bcrypt = require("bcryptjs");
const User = require("../../user/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/tambahpengguna/tambahuser/create", {
        role: req.session.user.role,
        alert,
        nama: req.session.user.name,
        title: "Tambah User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/tambahpengguna");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const dataUser = await User.findOne({ email });
      if (dataUser) {
        req.flash("alertMessage", "Email sudah ada");
        req.flash("alertStatus", "danger");
        res.redirect("/tambahpengguna");
      } else {
        let hashpassword = await bcrypt.hash(password, 10);
        const user = await User({ email: email, password: hashpassword, name });
        await user.save();
        req.flash("alertMessage", `Berhasil menambahkan user ${name}`);
        req.flash("alertStatus", "success");
        res.redirect("/tambahpengguna");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/tambahpengguna");
    }
  },
};
