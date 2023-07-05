const RiwayatPenerimaan = require("../lapor/laporpenerimaan/model");
const RiwayatPenolakan = require("../lapor/laporpenolakan/model");
const RiwayatPermintaan = require("../lapor/laporpermintaan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const laporanMasukPenerimaan = await RiwayatPenerimaan.countDocuments({
        statusBaca: true,
      });
      const laporanMasukPenolakan = await RiwayatPenolakan.countDocuments({
        statusBaca: true,
      });
      const laporanMasukPermintaan = await RiwayatPermintaan.countDocuments({
        statusBaca: true,
      });
      const riwayatPenerimaan = await RiwayatPenerimaan.find({
        pembuat: req.session.user.id,
      });
      const riwayatPenolakan = await RiwayatPenolakan.find({
        pembuat: req.session.user.id,
      });
      const riwayatPermintaan = await RiwayatPermintaan.find({
        pembuat: req.session.user.id,
      });
      const laporpenerimaan = await RiwayatPenerimaan.find({
        isdeleted: false,
        statusBaca: false,
      });
      const laporpenolakan = await RiwayatPenolakan.find({
        isdeleted: false,
        statusBaca: false,
      });
      const laporpermintaan = await RiwayatPermintaan.find({
        isdeleted: false,
        statusBaca: false,
      });
      const laporanMasuk = [
        ...laporpenerimaan,
        ...laporpenolakan,
        ...laporpermintaan,
      ];
      const penerimaan = riwayatPenerimaan.length;
      const penolakan = riwayatPenolakan.length;
      const permintaan = riwayatPermintaan.length;
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/dashboardupg/view_dashboardupg", {
        title: "Halaman Utama",
        nama: req.session.user.name,
        role: req.session.user.role,
        alert,
        laporanMasuk,
        laporanMasukPenerimaan,
        laporanMasukPenolakan,
        laporanMasukPermintaan,
        count: {
          penerimaan,
          penolakan,
          permintaan,
        },
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dashboardUpg");
    }
  },
};
