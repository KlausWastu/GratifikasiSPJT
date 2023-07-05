const LaporPenolakan = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  viewDataPenerima: async (req, res) => {
    try {
      res.render("admin/penolakan/datapelapor", {
        title: "Data Pelapor",
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
  viewDataPemberi: async (req, res) => {
    try {
      res.render("admin/penolakan/datapemberi", {
        title: "Data Pemberi",
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
  viewUraianPenolakan: async (req, res) => {
    try {
      res.render("admin/penolakan/uraianpenolakan", {
        title: "Uraian Penolakan",
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
  actionLaporPenolakan: async (req, res) => {
    try {
      const {
        namaPelapor,
        NIP,
        jabatan,
        noHp,
        email,
        namaPemberi,
        hubungan,
        jabatanPemberi,
        noHpPemberi,
        emailPemberi,
        alamat,
        lokasi,
        kota,
        jenisPenolakan,
        waktupenolakan,
        kegiatan,
        nilaiPenolakan,
        keteranganDok,
      } = req.body;
      const userPembuat = req.session.user.id;
      // Logika menangkap Hari
      const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const month = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const waktu = String(waktupenolakan);
      const bulan = waktu.slice(3, 5);
      const tanggal = waktu.slice(0, 2);
      const tahun = waktu.slice(6);
      const newWaktu = new Date(`${bulan}/${tanggal}/${tahun}`);
      const dayName = hari[newWaktu.getDay()];

      const newWaktuPenolakan = dayName + "/" + waktupenolakan;

      const date = new Date();
      const tgl = date.getDate();
      const bulanName = month[date.getMonth()];
      const thn = date.getFullYear();
      const hri = hari[date.getDay()];
      const newDate = hri + "/" + tgl + "/" + bulanName + "/" + thn;
      if (req.file) {
        let tmp_path = req.file.path;
        let filename = req.file.originalname;
        let target_path = path.resolve(
          config.rootPath,
          `public/upload/files/penolakan/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          const laporpenolakan = new LaporPenolakan({
            dataPenerima: {
              namaPelapor: namaPelapor,
              nomorIndukPegawai: NIP,
              jabatan: jabatan,
              kontakPelapor: {
                nomorHp: noHp,
                email: email,
              },
            },
            dataPemberi: {
              namaPemberi: namaPemberi,
              jabatan: jabatanPemberi,
              alamat: alamat,
              hubungan: hubungan,
              kontakPemberi: {
                nomorHp: noHpPemberi,
                email: emailPemberi,
              },
            },
            uraianPenolakan: {
              lokasi: lokasi,
              kota: kota,
              waktu: newWaktuPenolakan,
              kegiatan: kegiatan,
              jenisBentukPenolakan: jenisPenolakan,
              nilaiPenolakan: nilaiPenolakan,
              dokPendukung: filename,
              ketPendukung: keteranganDok,
            },
            pembuat: userPembuat,
            tglPembuatanLaporan: newDate,
          });
          await laporpenolakan.save();
          req.flash(
            "alertMessage",
            "Penolakan Gratifikasi telah berhasil ditambahkan silahkan cek di Riwayat Laporan Penolakan"
          );
          req.flash("alertStatus", "success");
          res.redirect("/lapor");
        });
      } else {
        const laporpenolakan = new LaporPenolakan({
          dataPenerima: {
            namaPelapor: namaPelapor,
            nomorIndukPegawai: NIP,
            jabatan: jabatan,
            kontakPelapor: {
              nomorHp: noHp,
              email: email,
            },
          },
          dataPemberi: {
            namaPemberi: namaPemberi,
            jabatan: jabatanPemberi,
            alamat: alamat,
            hubungan: hubungan,
            kontakPemberi: {
              nomorHp: noHpPemberi,
              email: emailPemberi,
            },
          },
          uraianPenolakan: {
            lokasi: lokasi,
            kota: kota,
            waktu: newWaktuPenolakan,
            kegiatan: kegiatan,
            jenisBentukPenolakan: jenisPenolakan,
            nilaiPenolakan: nilaiPenolakan,
            dokPendukung: "-",
            ketPendukung: "-",
          },
          pembuat: userPembuat,
          tglPembuatanLaporan: newDate,
        });
        await laporpenolakan.save();
        req.flash(
          "alertMessage",
          "Penolakan Gratifikasi telah berhasil ditambahkan silahkan cek di Riwayat Laporan Penolakan"
        );
        req.flash("alertStatus", "success");
        res.redirect("/lapor");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
};
