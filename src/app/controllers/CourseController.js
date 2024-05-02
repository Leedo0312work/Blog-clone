//Define Module
const Course = require("../models/Courses");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    //req.query... : query parameters
    //req.body... : POST method

    //Request data from slug
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  //[POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    //formData.image = `https://www.youtube.com/watch?v=${req.body.videoID}`;
    const course = new Course(formData);
    course
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  }
}

module.exports = new CourseController();
