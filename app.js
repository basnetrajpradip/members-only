const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const dotenv = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const logoutRouter = require("./routes/logout");
const createMessageRouter = require("./routes/createMessage");
const adminRouter = require("./routes/admin");
const memberRouter = require("./routes/member");
const messageDeleteRouter = require("./routes/messageDelete");

dotenv.config();

const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

//Set up mongoose connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}
mongoose.set("strictQuery", false);

main();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

//Set up Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//Set up passport authentication
require("./config/passport");
app.use(passport.session());

/* app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
}); */

//Set up Routes
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/log-out", logoutRouter);
app.use("/create-message", createMessageRouter);
app.use("/admin", adminRouter);
app.use("/member", memberRouter);
app.use("/delete-message", messageDeleteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
