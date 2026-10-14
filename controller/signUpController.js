const { body, matchedData, validationResult } = require("express-validator");
const bcript = require("bcryptjs");
const db = require("../db/queries");
const signUpRouter = require("../router/signUpRouter");

const validate = [
  body("username").trim().notEmpty().withMessage("Name can not be empty"),
  body("useremail").trim().isEmail().withMessage("Please enter your email"),
  body("password").notEmpty().withMessage("Please enter your password!"),
  body("confirmpassword")
    .notEmpty()
    .withMessage("Please comfirm password!")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(
      "your confirm password is not same with password. Please try it again!",
    ),
];

const getSignUp = (req, res) => {
  res.render("sign-up");
};

const postSignUp = [
  validate,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(404).render("sign-up", { errors: result.array() });
    }
    const { username, useremail, password } = matchedData(req);
    const hashedPassword = await bcript.hash(password, 10);
    await db.insertUser(username, useremail, hashedPassword);
    res.redirect("/");
  },
];

module.exports = { getSignUp, postSignUp };

//   post result, req.body eg:
//   username: 'baoanh',
//   useremail: 'abc@gmail.com',
//   password: 'baoanh123',
//   confirmpassword: 'baoanh123'
