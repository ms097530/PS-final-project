// * Routing Logic

const express = require('express')
const router = express.Router()
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, (req, res) => { })

// * get user profile info based on provided userId
router.get('/:id', ensureLoggedIn, (req, res) => { })

module.exports = router