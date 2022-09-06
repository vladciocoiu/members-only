var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const messageController = require('../controllers/messageController');


/* HOMEPAGE */
router.get('/', indexController.index);

/* LOGIN / LOGOUT */
router.get('/log-in', authController.loginGet)
router.post('/log-in', authController.loginPost)

router.post('/log-out', authController.logout)

/* REGISTER */
router.get('/register', authController.registerGet)
router.post('/register', authController.registerValidation, authController.registerPost)

/* JOIN */
router.get('/join', memberController.joinGet)
router.post('/join', memberController.joinPost)

/* MESSAGE */
router.get('/message', messageController.get)
router.post('/message', messageController.post)


module.exports = router;
