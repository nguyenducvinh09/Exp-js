require('dotenv').config();

const express = require('express')
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const port = 3000

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const app = express();
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const aboutRoute = require('./routes/about.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');
const csrfProtection = csrf({ cookie: true });

app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get('/', (req, res) => 
	res.render('index', {
		info: 'LoL'
	})
	);

app.use('/users', authMiddleware.authRequire, userRoute);
app.use('/auth', authRoute);
app.use('/about', aboutRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', csrfProtection, transferRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))