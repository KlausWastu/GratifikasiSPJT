const LaporPenerimaan = require("../../lapor/laporpenerimaan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const laporpenerimaan = await LaporPenerimaan.find({
        isdeleted: false,
        pembuat: req.session.user.id,
      });
      res.render("admin/riwayat/penerimaan/view_riwayatPenerimaan", {
        title: "Riwayat Laporan Penerimaan",
        laporpenerimaan,
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/riwayatPenerimaan");
    }
  },
  preview: async (req, res) => {
    try {
      const { id } = req.params;
      const riwayatLaporanUser = await LaporPenerimaan.findOne({ _id: id });
      console.log("data: ", riwayatLaporanUser);
      res.render("admin/riwayat/penerimaan/review", {
        title: "Preview Laporan",
        riwayatLaporanUser,
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/riwayatPenerimaan");
    }
  },
};
