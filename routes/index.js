var express = require('express')
var app = express()
var router = express.Router()
const userController = require('../controller/userController');
const isAuthenticated = require('../middleware/authMiddleware')
router.get('/', (req, res) =>  {
    res.send('hello world')
})

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/addArticle', userController.addArticle);
router.get('/userArticles', isAuthenticated.verifyToken, userController.getUserArticles);
module.exports = router;