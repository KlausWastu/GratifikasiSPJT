const LaporPenerimaan = require("../../../lapor/laporpenerimaan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const laporpenerimaan = await LaporPenerimaan.find({
        isdeleted: false,
        statusBaca: true,
        namaPenerimaLaporan: req.session.user.name,
      });
      res.render(
        "admin/unitpengendaligratifikasi/history/penerimaan/view_riwayatreviewed",
        {
          title: "Riwayat Reviewed Penerimaan Gratifikasi",
          laporpenerimaan,
          nama: req.session.user.name,
          role: req.session.user.role,
          alert,
        }
      );
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  downloadPDFView: async (req, res) => {
    try {
      const { id } = req.params;
      const riwayatLaporanUser = await LaporPenerimaan.findOne({ _id: id });

      res.render("admin/unitpengendaligratifikasi/history/penerimaan/downPdf", {
        title: "Review Laporan",
        riwayatLaporanUser,
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
