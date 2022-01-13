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
    const chars = employeeId.split("_");
    const [buCode, ...rest] = chars;
    let newTransaction = new transaction({
      employeeId: employeeId,
      buCode: buCode,
      dateName: dateName,
      createOn: day,
    });
    messge = await newTransaction.save();
    res
      .status(200)
      .json({ message: "sucess", detail: messge, count: count + 1 });
  } catch (error) {
    next(error);
  }
};

exports.clearData = async (req, res, next) => {
  await transaction.remove({}, function (err) {
    console.log("collection removed");
    res.status(200).json({ data: "data" });
  });
};

exports.checkLimitToday = async (req, res, next) => {
  try {
    const date = new Date();
    const dateName = format(date, "cccc");
    const day = format(date, "yyyy-MM-dd");
    const count = await couteDate(day);
    const findDate = await findDateLimit(dateName);
    res.status(200).json({
      usedToday: count,
      limitToday: findDate.limit,
      dateName: findDate.dateName,
      day: day,
    });
  } catch (error) {
    next(error);
  }
};
