const laporPermintaan = require("../../../lapor/laporpermintaan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const laporpermintaan = await laporPermintaan.find({
        isdeleted: false,
        statusBaca: false,
      });
      res.render(
        "admin/unitpengendaligratifikasi/laporanMasuk/permintaan/view_laporanpermintaan",
        {
          title: "Laporan Masuk Permintaan Gratifikasi",
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
  review: async (req, res) => {
    try {
      const { id } = req.params;
      const reviewLaporan = await laporPermintaan.findOne({ _id: id });
      res.render("admin/unitpengendaligratifikasi/review/permintaan/review", {
        title: "Review Laporan",
        reviewLaporan,
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUpg");
    }
  },
  actionReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { statusBaca } = req.query;
      const reviewLaporan = await laporPermintaan.findOne({ _id: id });
      const namaUPG = req.session.user.name;
      const currDate = new Date();
      const tahun = currDate.getFullYear();
      const Tanggal = String(currDate.getDate()).padStart(2, "0");
      const bulan = String(currDate.getMonth() + 1).padStart(2, "0");
      const date = Tanggal + "/" + bulan + "/" + tahun;

      await laporPermintaan.findOneAndUpdate(
        { _id: id },
        { namaPenerimaLaporan: namaUPG, tglPenerimaLaporan: date, statusBaca }
      );
      req.flash(
        "alertMessage",
        `Lapor Penerimaan ${reviewLaporan.dataPenerima.namaPelapor} berhasil direview silahkan cek riwayat review laporan`
      );
      req.flash("alertStatus", "success");
      res.redirect("/masukPermintaan");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUpg");
    }
  },
};
