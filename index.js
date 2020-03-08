//
// https://pugjs.org
//
const pug = require('pug'),
	path = require('path'),
	fs = require('fs');

function malta_pug(o, options) {
	const self = this,
		start = new Date(),
		oldname = o.name,
        pluginName = path.basename(path.dirname(__filename));

    let msg;

	return (solve, reject) => {
		try {
			pug.renderFile(o.name, {basedir : self.baseDir}, (x, content) => {
				o.content = content;
				o.name = o.name.replace(/\.pug$/, '.html');
				fs.writeFile(o.name, o.content, err => {
					err && self.doErr(err, o, pluginName);
					msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
					fs.unlink(oldname, () => {});
					err
                        ? reject(`Plugin ${pluginName} write error:\n${err}`)
                        : solve(o);
					self.notifyAndUnlock(start, msg);
				});
			});
		} catch (err) {
            reject(`Plugin ${pluginName} error:\n${err}`)
			self.doErr(err, o, pluginName);
		}
	};
}
malta_pug.ext = 'pug';
module.exports = malta_pug;