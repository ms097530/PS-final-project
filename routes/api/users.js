//* Routing Logic

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// get info about specific user with profile info
// * type=fr -> returns array of friends
// * type=freq -> returns array of friend requests
// * otherwise returns info about specific user
router.get('/:id', usersCtrl.getInfo)

router.post('/', usersCtrl.create);

router.post('/login', usersCtrl.login);

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);



module.exports = router;