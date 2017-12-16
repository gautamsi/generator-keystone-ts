/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

export let create = {
      <%= userModel %>: [
            { 'name.first': 'Admin', 'name.last': 'User', 'email': '<%= adminLogin %>', 'password': '<%= adminPassword %>', 'isAdmin': true },
      ],
};

/*

// This is the long-hand version of the functionality above:

import * as keystone from 'keystone';
import * as async from 'async';
const User = keystone.list('User');

const admins = [
      { email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin (admin, done) {

      const newAdmin = new User.model(admin);

      newAdmin.isAdmin = true;
      newAdmin.save(function (err) {
            if (err) {
                  console.error('Error adding admin ' + admin.email + ' to the database:');
                  console.error(err);
            } else {
                  console.log('Added admin ' + admin.email + ' to the database.');
            }
            done(err);
      });

}

export = function (done) {
      async.forEach(admins, createAdmin, done);
};

*/
