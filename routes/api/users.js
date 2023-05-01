//* Routing Logic

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', usersCtrl.search)

// * default -> returns info about specific user and profile
// * type=fr -> returns array of friends
// * type=freq -> returns array of friend requests
router.get('/:id', usersCtrl.getInfo)

router.post('/', usersCtrl.create);

router.post('/login', usersCtrl.login);

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);



module.exports = router;