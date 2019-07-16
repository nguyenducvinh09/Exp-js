const db = require('../db');

module.exports.authRequire = (req, res, next) => {
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}

	let user = db.get('users').find({id: req.signedCookies.userId}).value();

	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.userLogin = user;
	next();
};