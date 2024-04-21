const Course = require('../models/Courses')

class NewsController {
  //[GET] /site
  async index(req, res) {
    try {
      const data = await Course.find({})
      res.json(data)
    } catch (err) {
      res.status(400).json({ error: err })
    }

    // res.render('home');
  }

  //[GET] /site/search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new NewsController();
