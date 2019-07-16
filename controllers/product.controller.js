const db = require('../db');

module.exports.index = (req, res) => {
	let products = db.get('products').value();
	let page = parseInt(req.query.page) || 1;
	let perPage = 8;
	let start = (page - 1)*perPage;
	let end = page*perPage;
	let pageTotal = Math.ceil(products.length/perPage);

	res.render('products/index', {
		products: products.slice(start, end),
		currentPage: page,
		pageTotal: pageTotal,
		page: page,
		next: page + 1,
		lastPage: pageTotal
	})
	
}