const account = require("../route/account/account");

module.exports = function (app: any) {
  app.use("/account", account);
};
