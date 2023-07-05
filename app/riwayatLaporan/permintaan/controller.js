const LaporPermintaan = require("../../lapor/laporpermintaan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const laporpermintaan = await LaporPermintaan.find({
        isdeleted: false,
        pembuat: req.session.user.id,
      });
      res.render("admin/riwayat/permintaan/view_riwayatPermintaan", {
        title: "Riawayat Laporan Permintaan",
        laporpermintaan,
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUser");
    }
  },
  preview: async (req, res) => {
    try {
      const { id } = req.params;
      const riwayatLaporanUser = await LaporPermintaan.findOne({ _id: id });
      res.render("admin/riwayat/permintaan/review", {
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
