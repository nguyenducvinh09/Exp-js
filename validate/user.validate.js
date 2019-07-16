module.exports.postCreate = (req, res, next) => {
	let errors = [];
	if(!req.body.name) {
		errors.push('Name is not empty !');
	}
	if(!req.body.phone) {
		errors.push('Phone is not empty !');
	}
	if(errors.length){
		res.render('users/create', {
			errors: errors,
			user: req.body
		});
		return;
	}
	next();
};