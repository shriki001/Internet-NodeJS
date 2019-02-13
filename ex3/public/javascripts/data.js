const Recipes = require('./recipes');

const recipes = [];
recipes.push(new Recipes('The Author Of This Magic','kfir matityahu & michael shriki'));

module.exports = class RecipesData {
   static getByQuery(query) {
      return recipes.filter(function(e) {
         return e.description.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });}

   static getAll() {return recipes;}
   static getLength() {return recipes.length; }
   static add(recipe) {recipes.push(recipe);}
};