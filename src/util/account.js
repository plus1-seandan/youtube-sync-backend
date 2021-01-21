const models = require("../models");

const getAccountByEmail = async (email) => {
  return await models.Account.findOne({ where: { email: email } });
};

const getAccountById = async (acctId) => {
  return await models.Account.findOne({ where: { id: acctId } });
};

const createAccount = async (acct) => {
  return await models.Account.create(acct);
};

module.exports = { getAccountByEmail, createAccount, getAccountById };
