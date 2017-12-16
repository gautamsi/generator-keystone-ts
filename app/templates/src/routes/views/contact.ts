import * as keystone from 'keystone';
const Enquiry = keystone.list('Enquiry');

export = function (req, res) {

      const view = new keystone.View(req, res);
      const locals = res.locals;

      // Set locals
      locals.section = 'contact';
      locals.enquiryTypes = Enquiry.fields["enquiryType"].ops;
      locals.formData = req.body || {};
      locals.validationErrors = {};
      locals.enquirySubmitted = false;

      // On POST requests, add the Enquiry item to the database
      view.on('post', { action: 'contact' }, function (next) {

            const newEnquiry = new Enquiry.model();
            const updater = newEnquiry.getUpdateHandler(req);

            updater.process(req.body, {
                  flashErrors: true,
                  fields: 'name, email, phone, enquiryType, message',
                  errorMessage: 'There was a problem submitting your enquiry:',
            }, function (err) {
                  if (err) {
                        locals.validationErrors = err.errors;
                  } else {
                        locals.enquirySubmitted = true;
                  }
                  next();
            });
      });

      view.render('contact');
};
