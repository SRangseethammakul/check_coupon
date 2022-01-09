const dateSet = require("../models/dateSet");
exports.index = async (req, res, next) => {
  try {
    let dates = await dateSet.find();
    dates = dates.map((item) => {
      return {
        id: item._id,
        dateName: item.dateName,
        limit: item.limit,
      };
    });
    res.status(200).json({
      data: dates,
    });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit } = req.body;
    const editDate = await dateSet.updateOne(
      { _id: id },
      {
        limit,
      }
    );
    if (editDate.nModified === 0) {
      throw new Error("ไม่สามารถแก้ไขข้อมูลได้");
    } else {
      res.status(200).json({
        message: "updated",
      });
    }
  } catch (error) {
    next(error);
  }
};
