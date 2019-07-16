const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

const controller = require('../controllers/user.controller');
const userValidate = require('../validate/user.validate')

router.get('/', controller.index);

router.get('/search',controller.search);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), userValidate.postCreate, controller.postCreate);

router.get('/:id', controller.get);

router.get('/delete/:id', controller.removeId);

module.exports = router;