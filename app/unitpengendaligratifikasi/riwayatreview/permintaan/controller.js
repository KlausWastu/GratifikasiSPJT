const LaporPermintaan = require("../../../lapor/laporpermintaan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const laporpermintaan = await LaporPermintaan.find({
        isdeleted: false,
        statusBaca: true,
        namaPenerimaLaporan: req.session.user.name,
      });
      res.render(
        "admin/unitpengendaligratifikasi/history/permintaan/view_riwayatreviewed",
        {
          title: "Riwayat Reviewed Penolakan Gratifikasi",
          laporpermintaan,
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
      const riwayatLaporanUser = await LaporPermintaan.findOne({ _id: id });

      res.render("admin/unitpengendaligratifikasi/history/permintaan/downPdf", {
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
