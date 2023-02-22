const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    year: Number,
    type: String,
    brand: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
