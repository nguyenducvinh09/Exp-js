const db = require('../db');

module.exports.addCart = (req, res) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    console.log(productId);

    let count = db.get('sessions')
        .find({id: sessionId})
        .get('cart.' +productId, 0)
        .value();

    db.get('sessions')
        .find({id: sessionId})
        .set('cart.' + productId,count + 1)
        .write();

    res.redirect('/products');
};