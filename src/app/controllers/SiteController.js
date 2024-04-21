class NewsController {
  //[GET] /site
  index(req, res) {
    res.render('home');
  }

  //[GET] /site/search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new NewsController();
