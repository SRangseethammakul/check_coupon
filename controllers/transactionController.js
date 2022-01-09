const transaction = require("../models/transaction");
const { format } = require("date-fns");
const { findDateLimit } = require("../functions/checkDateLimit");
const {
  couteDate,
  findEmployeeUse,
  countPerDate,
} = require("../functions/transaction");
exports.index = async (req, res, next) => {
  try {
    let eee = await countPerDate();
    res.status(200).json(eee);
  } catch (error) {
    next(error);
  }
};
exports.insert = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    const date = new Date();
    const dateName = format(date, "cccc");
    const day = format(date, "yyyy-MM-dd");
    const count = await couteDate(day);
    const findDate = await findDateLimit(dateName);
    const findEmployee = await findEmployeeUse(day, employeeId);
    let messge;
    if (count >= findDate.limit) {
      throw new Error("Fully");
    }
    if (findEmployee) {
      throw new Error("Used");
    }
    let newTransaction = new transaction({
      employeeId: employeeId,
      dateName: dateName,
      createOn: day,
    });
    messge = await newTransaction.save();
    res.status(200).json(messge);
  } catch (error) {
    next(error);
  }
};
