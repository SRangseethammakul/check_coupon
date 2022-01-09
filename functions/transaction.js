const transaction = require("../models/transaction");
const couteDate = (dateNow) => {
  return new Promise((resolve, reject) => {
    transaction.find({ createOn: { $eq: dateNow } }, async (err, result) => {
      if (err) reject(err);
      resolve(result.length);
    });
  });
};
const findEmployeeUse = (dateNow, employeeId) => {
  return new Promise((resolve, reject) => {
    transaction.findOne(
      { createOn: { $eq: dateNow }, employeeId: { $eq: employeeId } },
      async (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
const countPerDate = () => {
  const aggregatorOpts = [
    {
      $group: {
        _id: "$createOn",
        count: { $sum: 1 },
      },
    },
  ];
  return new Promise((resolve, reject) => {
    transaction.aggregate(aggregatorOpts, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
module.exports = {
  couteDate,
  findEmployeeUse,
  countPerDate,
};
