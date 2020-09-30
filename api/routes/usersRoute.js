const express = require("express"),
  User = require("../models/user"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  { registerValidate, loginValidate } = require("../../validation");

router.post("/register", async (req, res) => {
  // validate data
  const { error } = registerValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check exist user
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("Email already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    let savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  // validate data
  const { error } = loginValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check exist user
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email is not found");

  //password is correct or not
  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPass) return res.status(400).send("Invalid password");

  res.send("Success");
});

module.exports = router;
