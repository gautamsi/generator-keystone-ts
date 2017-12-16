import * as keystone from 'keystone';

export = function (req, res) {

      const view = new keystone.View(req, res);
      const locals = res.locals;

      // Set locals
      locals.section = 'gallery';

      // Load the galleries by sortOrder
      view.query('galleries', keystone.list('Gallery').model.find().sort('-publishedDate'));

      // Render the view
      view.render('gallery');

};
