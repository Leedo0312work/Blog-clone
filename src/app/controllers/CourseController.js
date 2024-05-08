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
    //formData.image = `https://www.youtube.com/watch?v=${req.body.videoID}`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[DELETE] /courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action invalid!' })
    }
  }

  //[POST] /courses/handle-trash-form
  handleTrashForm(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action invalid!!' })
    }
  }

}

module.exports = new CourseController();