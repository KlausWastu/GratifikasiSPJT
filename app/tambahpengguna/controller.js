const bcrypt = require("bcryptjs");
const User = require("../user/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const tambahpengguna = await User.find({
        role: ["user", "upg", "admin"],
      });
      res.render("admin/tambahpengguna/view_tambahpengguna", {
        role: req.session.user.role,
        tambahpengguna,
        alert,
        nama: req.session.user.name,
        title: "Pengguna",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUser");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      res.render("admin/tambahpengguna/editUser/edit", {
        title: "Edit pengguna",
        nama: req.session.user.name,
        role: req.session.user.role,
        user,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUser");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, name } = req.body;
      let hashpass = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: id },
        { email, password: hashpass, name }
      );
      req.flash("alertMessage", "Pengguna telah diperbarui");
      req.flash("alertStatus", "success");
      res.redirect("/tambahPengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/tambahPengguna");
    }
  },
  status: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      const user = await User.findOne({ _id: id });
      await User.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", `Status ${user.name} telah diubah`);
      req.flash("alertStatus", "success");
      res.redirect("/tambahPengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/tambahPengguna");
    }
  },
};
