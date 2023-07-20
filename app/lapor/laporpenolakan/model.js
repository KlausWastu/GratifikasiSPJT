const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
let laporanPenolakanSchema = mongoose.Schema(
  {
    dataPenerima: {
      namaPelapor: {
        type: String,
      },
      jabatan: {
        type: String,
      },
      unitKerja: {
        type: String,
      },
      nomorIndukPegawai: {
        type: String,
      },
      kontakPelapor: {
        nomorHp: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    },
    dataPemberi: {
      namaPemberi: {
        type: String,
      },
      jabatan: {
        type: String,
      },
      pekerjaan: {
        type: String,
      },
      alamat: {
        type: String,
      },
      hubungan: {
        type: String,
      },
      kontakPemberi: {
        nomorHp: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    },
    uraianPenolakan: {
      lokasi: {
        type: String,
      },
      kota: {
        type: String,
      },
      waktu: {
        type: String,
      },
      kegiatan: {
        type: String,
        default: "-",
      },
      jenisBentukPenolakan: {
        type: String,
      },
      nilaiPenolakan: {
        type: String,
      },
      dokPendukung: {
        type: String,
      },
      ketPendukung: {
        type: String,
      },
    },
    pembuat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    statusBaca: {
      type: Boolean,
      default: false,
    },
    namaPenerimaLaporan: {
      type: String,
    },
    tglPenerimaLaporan: {
      type: String,
    },
    tglPembuatanLaporan: {
      type: String,
    },
  },
  { timestamps: true }
);
laporanPenolakanSchema.plugin(mongoose_delete, {
  deleteAt: true,
});
module.exports = mongoose.model("LaporanPenolakan", laporanPenolakanSchema);
