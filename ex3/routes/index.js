const express = require('express');
const router = express.Router();
const Recipes = require('../public/javascripts/recipes');
const RecipesData = require('../public/javascripts/data.js');


router.get('/', (req, res, next)=> {
  res.render('index', { page: 'Available Recipes', menuId: 'home' ,list:RecipesData.getAll()});
});

router.get('/search/:value', (req, res, next)=> {
  return res.json(RecipesData.getByQuery(req.params.value));
});

router.get('/search', (req, res, next) =>{
  res.render('search', { page: 'Search', menuId: 'search'});
});

router.get('/add_recipes', (req, res, next)=> {
  res.render('add_recipes', { page: 'Add Recipes', menuId: 'add_recipes' });
});

router.post('/success', (req, res)=> {
  let newRecipes = new Recipes(req.body.name, req.body.description);
  RecipesData.add(newRecipes);
  res.render('success', { page: 'Success!', menuId: 'success', count: RecipesData.getLength() });
});

module.exports = router;
