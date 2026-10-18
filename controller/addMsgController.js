const db = require("../db/queries");
const { body, matchedData, validationResult } = require("express-validator");

const validate = [body("title_msg").trim(), body("text_msg").trim()];

const getAddMessage = (req, res) => {
  res.render("add-messageVibe", { user: req.user });
};

const postAddMessage = [
  validate,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(404)
        .render("add-messageVibe", { errors: result.array() });
    }
    let { title_msg, text_msg } = matchedData(req);
    title_msg = title_msg ? title_msg : "No title";
    text_msg = text_msg ? text_msg : "No message";
    const date = new Date().toISOString().split("T")[0];
    await db.insertMessage(title_msg, text_msg, date, req.user);
    return res.redirect("/");
  },
];

module.exports = { getAddMessage, postAddMessage };
