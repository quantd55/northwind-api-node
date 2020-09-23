const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryID: Number,
  categoryName: {
    type: String,
    required: true,
  },
  description: String,
  picture: String,
});

module.exports = mongoose.model("categories", categorySchema);
