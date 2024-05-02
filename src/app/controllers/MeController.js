//Define Module
const Course = require("../models/Courses");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  //[GET] /stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render("me/stored-coures", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
