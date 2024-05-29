const Course = require("../models/Courses");
const { multipleMongooseToObject } = require("../../util/mongoose");

class NewsController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((error) => next(error));
  }
}

module.exports = new NewsController();
