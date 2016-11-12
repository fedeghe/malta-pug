//
// https://pugjs.org
//

require('malta').checkDeps('pug');

var pug = require('pug'),
	path = require('path'),
	fs = require('fs');

function malta_pug(o, options) {
	var self = this,
		start = new Date(),
		msg,
		oldname = o.name;
	return function (solve, reject){
		pug.renderFile(o.name, {basedir : self.baseDir}, function (x, content) {
			
			o.content = content;
			
			o.name = o.name.replace(/\.pug$/, '.html');
			
			fs.writeFile(o.name, o.content, function(err) {
				if (err == null) {
					msg = 'plugin ' + path.basename(path.dirname(__filename)).white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
				} else {
					console.log('[ERROR] pug says:');
					console.dir(err);
					self.stop();
				}
				fs.unlink(oldname);
				solve(o);
				self.notifyAndUnlock(start, msg);
			});

		});
	};
}
malta_pug.ext = 'pug';
module.exports = malta_pug;