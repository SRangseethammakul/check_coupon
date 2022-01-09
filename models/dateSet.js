const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    dateName: {
      type: String,
      require: true,
      trim: true,
    },
    limit: {
      type: Number,
      require: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "dates",
  }
);

const Date = mongoose.model("Date", schema);

module.exports = Date;
