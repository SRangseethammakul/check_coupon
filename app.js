const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const config = require("./config/index");
const cors = require("cors");
const helmet = require("helmet");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const barcodeRouter = require("./routes/barcode");
const dateSetRouter = require("./routes/dateSet");
const transactionRouter = require("./routes/transaction");
const transactionInformationRouter = require("./routes/transactionInformation");

//import middleware
const errorHandler = require("./middleware/errorHandler");
const passportJWT = require("./middleware/passportJWT");

const app = express();

app.use(cors());

app.set("trust proxy", 1);

app.use(helmet());

TZ = "Asia/Bangkok";

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/barcode", barcodeRouter);
app.use("/dateset", [passportJWT.isLogin], dateSetRouter);
app.use("/transaction", transactionRouter);
app.use("/transaction_infomation", [passportJWT.isLogin], transactionInformationRouter);

app.use(errorHandler);

module.exports = app;
