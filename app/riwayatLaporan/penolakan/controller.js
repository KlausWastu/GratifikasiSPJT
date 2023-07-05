const LaporPenolakan = require("../../lapor/laporpenolakan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const laporpenolakan = await LaporPenolakan.find({
        isdeleted: false,
        pembuat: req.session.user.id,
      });
      res.render("admin/riwayat/penolakan/view_riwayatPenolakan", {
        title: "Riawayat Laporan Penolakan",
        laporpenolakan,
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
      const riwayatLaporanUser = await LaporPenolakan.findOne({ _id: id });
      console.log("data: ", riwayatLaporanUser);
      res.render("admin/riwayat/penolakan/review", {
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
