//Define Module
const Course = require("../models/Courses");
const { multipleMongooseToObject } = require("../../util/mongoose");


class MeController {
  //[GET] me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({})

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    //Count with asynchronous
    Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true })])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-coures", { deletedCount, courses: multipleMongooseToObject(courses) })
      )
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount)
    //   })
    //   .catch(()=>{})

    // Course.find({})
    //   .then((courses) =>
    //     res.render("me/stored-coures", {
    //       courses: multipleMongooseToObject(courses),
    //     })
    //   )
    //   .catch(next);
  }
  //[GET] me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render("me/trash-coures", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
