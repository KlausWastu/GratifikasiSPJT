const mongoose = require("mongoose");
let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true | "Email harus di isi"],
    },
    password: {
      type: String,
      require: [true | "Password harus di isi"],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    role: {
      type: String,
      enum: ["admin", "user", "upg"],
      default: "user",
    },
    name: {
      type: String,
      require: [true | "Nama harus di isi"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
