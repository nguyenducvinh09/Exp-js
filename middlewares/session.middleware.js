const shortId = require('shortid');

const db = require('../db');

module.exports = (req, res , next) => {

    if(!req.signedCookies.sessionId) {
        let sessionId = shortId.generate();
        res.cookie('sessionId', sessionId, {
             signed: true
         })
        db.get('sessions').push({id: sessionId}).write();
    }else {
        let sessionId = req.signedCookies.sessionId;
        let carts = db.get('sessions').find({id: sessionId}).get('cart').value();
        let sumCart = 0;
        for(var cart in carts) {
            sumCart += carts[cart];
        }
        res.locals.sum = sumCart;
    
    }
    
    next();
};