const dateSet = require("../models/dateSet");
const findDateLimit = (dateName) => {
  return new Promise((resolve, reject) => {
    dateSet.findOne({ dateName: { $eq: dateName } }, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
module.exports = {
  findDateLimit,
};
