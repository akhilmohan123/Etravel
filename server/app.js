const express = require("express");
const app = express();
require("dotenv").config();
const userrouter = require("./routes/user");
const connection = require("./connection/connection");
const body_parser = require("body-parser");
const passportstrategy = require("./helper/passport_helper");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportauth = require("./routes/passportroute");
const cors = require("cors");

connection();

// CORS middleware

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.options('*', cors())
// Session middleware
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Ensure session functions are always available
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

// Routes
app.use("/", userrouter);
app.use("/auth", passportauth);

// Start server
app.listen(process.env.PORT, () => {
  console.log("Server is listening to the port " + process.env.PORT);
});
