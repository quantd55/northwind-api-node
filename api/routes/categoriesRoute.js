const express = require("express"),
  router = express.Router(),
  Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/create", async (req, res) => {
  const category = new Category({
    categoryID: req.body.categoryID,
    categoryName: req.body.categoryName,
    description: req.body.description,
    picture: req.body.picture,
  });
  try {
    let savedCategory = category.save();
    res.json(savedCategory);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
