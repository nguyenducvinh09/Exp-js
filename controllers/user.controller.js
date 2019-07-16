const shortid = require('shortid');

const db = require('../db');

module.exports.index =  (req, res) => {
	res.render('users/index', {
		users : db.get('users').value()
	});
};

module.exports.search =  (req, res) => {
	let q = req.query.q.toLowerCase();
	let matchedUsers = db.get('users').value().filter(user =>
	 user.name.toLowerCase().indexOf(q) !==-1);
	res.render('users/index',{
		users: matchedUsers,
		paramValue: q
	})

};

module.exports.create = (req, res) => {
	res.render('users/create')
};

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	db.get('users').push(req.body).write();
	res.redirect('/users');
};

module.exports.get = (req, res) => {
	let userView = db.get('users').find({id: req.params.id}).value();
	res.render('users/view', {
		user: userView
	})
};

module.exports.removeId = (req, res) => {
	let id = req.params.id;
	db.get('users').remove({ id: id }).write();
	//error image  false request url
	// res.render('users/index', {
	// 	users : db.get('users').value()q
	// })
	res.redirect('/users')
};
