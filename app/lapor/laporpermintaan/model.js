const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
let laporanPermintaanSchema = mongoose.Schema(
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
    dataPeminta: {
      namaPeminta: {
        type: String,
      },
      jabatan: {
        type: String,
      },
      alamat: {
        type: String,
      },
      instansiPeminta: {
        type: String,
      },
      hubungan: {
        type: String,
      },
      kontakPeminta: {
        nomorHp: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    },
    uraianPermintaan: {
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
      jenisBentukPermintaan: {
        type: String,
      },
      nilaiPermintaan: {
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
laporanPermintaanSchema.plugin(mongoose_delete, {
  deleteAt: true,
});
module.exports = mongoose.model("LaporanPermintaan", laporanPermintaanSchema);
