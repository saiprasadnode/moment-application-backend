const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.js');
const userController = require('../controllers/userController');
const { validateUser, validateMoment } = require('../validators/userValidator');
const validateRequest = require('../middlewares/validateRequest');

//posting new user
router.post('/add', validateUser, validateRequest, userController.addUser);

// adding images and tags
router.post('/addmoment', upload.array('images', 5), validateMoment, validateRequest, userController.addMoment);

//get all users list 
router.get('/', userController.getUsers);


module.exports = router;
