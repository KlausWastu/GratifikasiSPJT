const LaporPermintaan = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  viewDataPenerima: async (req, res) => {
    try {
      res.render("admin/permintaan/datapelapor", {
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
  viewDataPeminta: async (req, res) => {
    try {
      res.render("admin/permintaan/datapeminta", {
        title: "Data Peminta",
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
  viewUraianPermintaan: async (req, res) => {
    try {
      res.render("admin/permintaan/uraianpermintaan", {
        title: "Uraian PErmintaan",
        nama: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alerMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/lapor");
    }
  },
  actionLaporPermintaan: async (req, res) => {
    try {
      const {
        namaPelapor,
        NIP,
        jabatan,
        noHp,
        email,
        namaPeminta,
        hubungan,
        jabatanPeminta,
        noHpPeminta,
        emailPeminta,
        alamat,
        lokasi,
        kota,
        jenisPermintaan,
        waktupermintaan,
        kegiatan,
        nilaiPermintaan,
        keteranganDok,
      } = req.body;
      const userPembuat = req.session.user.id;
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
      const waktu = String(waktupermintaan);
      const bulan = waktu.slice(3, 5);
      const tanggal = waktu.slice(0, 2);
      const tahun = waktu.slice(6);
      const newWaktu = new Date(`${bulan}/${tanggal}/${tahun}`);
      const dayName = hari[newWaktu.getDay()];

      const newWaktuPermintaan = dayName + "/" + waktupermintaan;

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
          `public/upload/files/permintaan/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          const laporpermintaan = new LaporPermintaan({
            dataPenerima: {
              namaPelapor: namaPelapor,
              nomorIndukPegawai: NIP,
              jabatan: jabatan,
              kontakPelapor: {
                nomorHp: noHp,
                email: email,
              },
            },
            dataPeminta: {
              namaPeminta: namaPeminta,
              jabatan: jabatanPeminta,
              alamat: alamat,
              hubungan: hubungan,
              kontakPeminta: {
                nomorHp: noHpPeminta,
                email: emailPeminta,
              },
            },
            uraianPermintaan: {
              lokasi: lokasi,
              kota: kota,
              waktu: newWaktuPermintaan,
              kegiatan: kegiatan,
              jenisBentukPermintaan: jenisPermintaan,
              nilaiPermintaan: nilaiPermintaan,
              dokPendukung: filename,
              ketPendukung: keteranganDok,
            },
            pembuat: userPembuat,
            tglPembuatanLaporan: newDate,
          });
          await laporpermintaan.save();
          req.flash(
            "alertMessage",
            "Permintaan Gratifikasi telah berhasil ditambahkan silahkan cek di Riwayat Laporan Permintaan"
          );
          req.flash("alertStatus", "success");
          res.redirect("/lapor");
        });
      } else {
        const laporpermintaan = new LaporPermintaan({
          dataPenerima: {
            namaPelapor: namaPelapor,
            nomorIndukPegawai: NIP,
            jabatan: jabatan,
            kontakPelapor: {
              nomorHp: noHp,
              email: email,
            },
          },
          dataPeminta: {
            namaPeminta: namaPeminta,
            jabatan: jabatanPeminta,
            alamat: alamat,
            hubungan: hubungan,
            kontakPeminta: {
              nomorHp: noHpPeminta,
              email: emailPeminta,
            },
          },
          uraianPermintaan: {
            lokasi: lokasi,
            kota: kota,
            waktu: newWaktuPermintaan,
            kegiatan: kegiatan,
            jenisBentukPermintaan: jenisPermintaan,
            nilaiPermintaan: nilaiPermintaan,
            dokPendukung: "-",
            ketPendukung: "-",
          },
          pembuat: userPembuat,
          tglPembuatanLaporan: newDate,
        });
        await laporpermintaan.save();
        req.flash(
          "alertMessage",
          "Permintaan Gratifikasi telah berhasil ditambahkan silahkan cek di Riwayat Laporan Permintaan"
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
