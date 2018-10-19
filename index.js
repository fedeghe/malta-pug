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
		oldname = o.name,
        pluginName = path.basename(path.dirname(__filename));

	return function (solve, reject){
		try {
			pug.renderFile(o.name, {basedir : self.baseDir}, function (x, content) {
				o.content = content;
				o.name = o.name.replace(/\.pug$/, '.html');
				fs.writeFile(o.name, o.content, function(err) {
					err && self.doErr(err, o, pluginName);
					msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
					fs.unlink(oldname, () => {});
					solve(o);
					self.notifyAndUnlock(start, msg);
				});
			});
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_pug.ext = 'pug';
module.exports = malta_pug;