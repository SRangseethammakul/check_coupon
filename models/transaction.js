const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    employeeId: { type: String, trim: true, required: true, index: true },
    dateName: {
      type: String,
      require: true,
      trim: true,
    },
    buCode: {
      type: String,
      trim: true,
    },
    createOn: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "transactions",
  }
);

const Transaction = mongoose.model("transactions", schema);

module.exports = Transaction;
