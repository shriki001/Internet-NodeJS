const express = require('express');
const router = express.Router();
const AuthControl = require('../controllers/authControl');

router.get('/', AuthControl.handelStartPage());

router.get('/search/:value', AuthControl.handelSearch());

router.post('/index/:id', AuthControl.handelRemove());

router.get('/search', AuthControl.getAuth());

router.get('/add_recipes', AuthControl.handelAddRecipesPage());

router.post('/success', AuthControl.handelSuccessPage());

module.exports = router;
