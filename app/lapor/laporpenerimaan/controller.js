const LaporPenerimaan = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  viewDataPenerima: async (req, res) => {
    try {
      res.render("admin/penerimaan/datapelapor", {
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
      res.render("admin/penerimaan/datapemberi", {
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
  viewUraianPenerimaan: async (req, res) => {
    try {
      res.render("admin/penerimaan/uraianpenerimaan", {
        title: "Uraian Penerimaan",
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
  actionLaporPenerimaan: async (req, res) => {
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
        jenisPenerimaan,
        waktupenerimaan,
        kegiatan,
        nilaiPenerimaan,
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
      const waktu = String(waktupenerimaan);
      const bulan = waktu.slice(3, 5);
      const tanggal = waktu.slice(0, 2);
      const tahun = waktu.slice(6);
      const newWaktu = new Date(`${bulan}/${tanggal}/${tahun}`);
      const dayName = hari[newWaktu.getDay()];

      const newWaktuPenerimaan = dayName + "/" + waktupenerimaan;

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
          `public/upload/files/penerimaan/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          const laporpenerimaan = new LaporPenerimaan({
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
            uraianPenerimaan: {
              lokasi: lokasi,
              kota: kota,
              waktu: newWaktuPenerimaan,
              kegiatan: kegiatan,
              jenisBentukPenerimaan: jenisPenerimaan,
              nilaiPenerimaan: nilaiPenerimaan,
              dokPendukung: filename,
              ketPendukung: keteranganDok,
            },
            pembuat: userPembuat,
            tglPembuatanLaporan: newDate,
          });
          await laporpenerimaan.save();
          req.flash(
            "alertMessage",
            "Penerimaan Gratifikasi telah berhasil ditambahkan silahkan cek di Riwayat Laporan Penerimaan"
          );
          req.flash("alertStatus", "success");
          res.redirect("/lapor");
        });
      } else {
        const laporpenerimaan = new LaporPenerimaan({
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
          uraianPenerimaan: {
            lokasi: lokasi,
            kota: kota,
            waktu: newWaktuPenerimaan,
            kegiatan: kegiatan,
            jenisBentukPenerimaan: jenisPenerimaan,
            nilaiPenerimaan: nilaiPenerimaan,
            dokPendukung: "-",
            ketPendukung: "-",
          },
          pembuat: userPembuat,
          // tglPembuatanLaporan: newDate,
        });
        await laporpenerimaan.save();
        req.flash(
          "alertMessage",
          "Penerimaan Gratifikasi telah berhasil ditambahkan silahkan cek di Riwayat Laporan Penerimaan"
        );
        req.flash("alertStatus", "success");
        res.redirect("/lapor");
      }
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
};
