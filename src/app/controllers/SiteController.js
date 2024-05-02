const Course = require("../models/Courses");
const { multipleMongooseToObject } = require("../../util/mongoose");

class NewsController {
  //[GET] /site
  // async index(req, res, next) {
  //   try {
  //     const data = await Course.find({})
  //     res.json(data)
  //   } catch (err) {
  //     next(err)
  //   }
  //   // res.render('home');
  // }

  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((error) => next(error));
  }

  //[GET] /site/search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new NewsController();
