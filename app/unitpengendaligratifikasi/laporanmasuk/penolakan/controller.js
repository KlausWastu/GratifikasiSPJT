const LaporPenolakan = require("../../../lapor/laporpenolakan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const laporpenolakan = await LaporPenolakan.find({
        isdeleted: false,
        statusBaca: false,
      });
      res.render(
        "admin/unitpengendaligratifikasi/laporanMasuk/penolakan/view_laporanpenolakan",
        {
          title: "Laporan Masuk Penolakan Gratifikasi",
          laporpenolakan,
          nama: req.session.user.name,
          role: req.session.user.role,
          alert,
        }
      );
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/masukPenolakan");
    }
  },
  review: async (req, res) => {
    try {
      const { id } = req.params;
      const reviewLaporan = await LaporPenolakan.findOne({ _id: id });
      res.render("admin/unitpengendaligratifikasi/review/penolakan/review", {
        title: "Review Laporan",
        reviewLaporan,
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/masukPenolakan");
    }
  },
  actionReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { statusBaca } = req.query;
      const reviewLaporan = await LaporPenolakan.findOne({ _id: id });
      const namaUPG = req.session.user.name;
      const currDate = new Date();
      const tahun = currDate.getFullYear();
      const Tanggal = String(currDate.getDate()).padStart(2, "0");
      const bulan = String(currDate.getMonth() + 1).padStart(2, "0");
      const date = Tanggal + "/" + bulan + "/" + tahun;

      await LaporPenolakan.findOneAndUpdate(
        { _id: id },
        { namaPenerimaLaporan: namaUPG, tglPenerimaLaporan: date, statusBaca }
      );
      req.flash(
        "alertMessage",
        `Lapor Penerimaan ${reviewLaporan.dataPenerima.namaPelapor} berhasil direview silahkan cek riwayat review laporan`
      );
      req.flash("alertStatus", "success");
      res.redirect("/masukPenolakan");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUpg");
    }
  },
};
