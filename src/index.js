const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require("./routes");
const db = require("./config/db");

db.connect();

const app = express();
const port = 3000;

//static file
app.use(express.static(path.join(__dirname, "public")));

//Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Override using a header
app.use(methodOverride("_method"));

//Custome middleware
app.use(SortMiddleware)

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    //Custom helpers:
    helpers: require('./helpers/handlebars')
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
