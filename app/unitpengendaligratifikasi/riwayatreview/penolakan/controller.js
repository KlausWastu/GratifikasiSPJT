const laporPenolakan = require("../../../lapor/laporpenolakan/model");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const laporpenolakan = await laporPenolakan.find({
        isdeleted: false,
        statusBaca: true,
        namaPenerimaLaporan: req.session.user.name,
      });
      res.render(
        "admin/unitpengendaligratifikasi/history/penolakan/view_riwayatreviewed",
        {
          title: "Riwayat Reviewed Penolakan Gratifikasi",
          laporpenolakan,
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
};
