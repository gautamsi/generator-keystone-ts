var shell = require('shelljs');

shell.mkdir("-p",["dist/public/js","dist/public/fonts","dist/public/images"])

shell.cp('-R', 'src/public/js/', 'dist/public/');
shell.cp('-R', 'src/public/fonts/', 'dist/public/');
shell.cp('-R', 'src/public/images', 'dist/public/');
shell.cp('-R', 'src/public/favicon.ico', 'dist/public/');
