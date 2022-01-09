const {
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  format,
} = require("date-fns");
const transaction = require("../models/transaction");
const { findDateLimit, couteDate } = require("../functions/checkDateLimit");
exports.index = async (req, res, next) => {
  try {
    let date = new Date();
    let day;
    switch (true) {
      case isMonday(date):
        day = monday;
        console.log("isMonday");
        break;
      case isTuesday(date):
        console.log("isTuesday");
        break;
      case isWednesday(date):
        console.log("isWednesday");
        break;
      case isThursday(date):
        console.log("isThursday");
        break;
      case isFriday(date):
        console.log("isFriday");
        break;
      case isSaturday(date):
        console.log("isSaturday");
        break;
      case isSunday(date):
        console.log("isSunday");
        break;
    }
    day = format(date, "yyyy-MM-dd");
    console.log(day);
    let tran = new transaction({
      employeeId: "0001",
      dateName: day,
      createOn: day,
    });
    let tttt = await tran.save();
    res.status(200).json({
      data: tttt,
    });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    let date = new Date();
    let dateName = format(date, "cccc");
    let day = format(date, "yyyy-MM-dd");
    let count = await couteDate(day);
    let findDate = await findDateLimit(dateName);
    console.log(count);
    console.log(findDate);
    let status = count <= findDate.limit;

    res.status(200).json({
      data: status,
    });
  } catch (error) {
    next(error);
  }
};
