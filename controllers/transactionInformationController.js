const Transaction = require("../models/transaction");
const { format } = require("date-fns");
const { countPerDate, countPerBU } = require("../functions/transaction");
exports.index = async (req, res, next) => {
  try {
    let transactions = await Transaction.find().sort({ _id: -1 });
    transactions = await transactions.map((item) => {
      return {
        employeeId: item.employeeId,
        buCode: item.buCode,
        datetime: format(item.createdAt, "dd-MM-yyyy HH:mm:ss"),
        key: item.key,
      };
    });
    res.status(200).json({ data: transactions });
  } catch (error) {
    next(error);
  }
};
exports.countNumberPerDate = async (req, res, next) => {
  try {
    let transactions = await countPerDate();
    transactions = transactions.map((item) => {
      return {
        name: item._id,
        number: item.count,
      };
    });

    let transactionbybus = await countPerBU();
    transactionbybus = transactionbybus.map(item => ({
      name: item._id,
      number: item.count,
    }));

    res
      .status(200)
      .json({ data: transactions, transactionbybus: transactionbybus });
  } catch (error) {
    next(error);
  }
};
exports.countNumberPerBU = async (req, res, next) => {
  try {
    let transactions = await countPerBU();
    transactions = transactions.map((item) => ({
      name: item._id,
      number: item.count,
    }));
    res.status(200).json({ data: transactions });
  } catch (error) {
    next(error);
  }
};

exports.searchByDate = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    let transactions = await Transaction.find({
      createOn: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ _id: -1 });
    transactions = await transactions.map((item) => ({
      employeeId: item.employeeId,
      buCode: item.buCode,
      datetime: format(item.createdAt, "dd-MM-yyyy HH:mm:ss"),
      key: item.key,
    }));
    res.status(200).json({ data: transactions });
  } catch (error) {
    next(error);
  }
};
