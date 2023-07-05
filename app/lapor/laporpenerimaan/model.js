const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
let laporanPenerimaanSchema = mongoose.Schema(
  {
    dataPenerima: {
      namaPelapor: {
        type: String,
      },
      jabatan: {
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
    uraianPenerimaan: {
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
      jenisBentukPenerimaan: {
        type: String,
      },
      nilaiPenerimaan: {
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
    tglPembuatanLaporan: {
      type: String,
    },
    tglPenerimaLaporan: {
      type: String,
    },
  },
  { timestamps: true }
);
laporanPenerimaanSchema.plugin(mongoose_delete, {
  deleteAt: true,
});
module.exports = mongoose.model("LaporanPenerima", laporanPenerimaanSchema);
