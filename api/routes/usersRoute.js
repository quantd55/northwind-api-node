const express = require("express"),
  User = require("../models/user"),
  router = express.Router(),
  Joi = require("@hapi/joi");

let schema = {
  fullname: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
};
router.post("/register", async (req, res) => {
  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    let savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
