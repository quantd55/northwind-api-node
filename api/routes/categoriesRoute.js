const express = require("express"),
  router = express.Router(),
  Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    let categories = await Category.find();

    res.json(categories);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let categories = await Category.findById(req.params.id);

    res.json(categories);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    let removedCategory = await Category.remove({ _id: req.params.id });
    res.json(removedCategory);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let updatedCategory = await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          description: req.body.description,
        },
      }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
