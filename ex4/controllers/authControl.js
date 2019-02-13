const RecipesModel = require('../model/recipesdb');

module.exports = class authController {
    static getAuth() {
        return (req, res, next) => {
            if (!req.session.added)
                return res.redirect('add_recipes');
            res.render('search', { page: 'Search', menuId: 'search', history:req.session.searches});
        };
    }

    static handelStartPage()
    {
        RecipesModel.initDb();
        return (req, res, next) => {
            if(!req.session.searches)
                req.session.searches = [];
            RecipesModel.getData().then((data)=>{
                res.render('index', { page: 'Available Recipes', menuId: 'home' ,list:data});
            });
        };
    }

    static handelRemove()
    {
        return (req, res, next) => {
            let id = req.params.id;
            RecipesModel.removeData(Number(id)).then((data)=>{
                return res.json(data);
            });
        };
    }

    static handelSearch()
    {
        return (req, res, next) => {
            let txt = req.params.value;
            req.session.searches.unshift(txt);
            RecipesModel.getByQuery(txt).then((data)=>{
                return res.json([data ,req.session.searches]);
            });
        };
    }

    static handelAddRecipesPage()
    {
        return (req, res, next) => {
            res.render('add_recipes', { page: 'Add Recipes', menuId: 'add_recipes' });
        };
    }

    static handelSuccessPage()
    {
        return (req, res, next) => {
            req.session.added = true;
            let author = req.body.name;
            let description = req.body.description;
            RecipesModel.addRecipe(author, description);
            RecipesModel.getCount().then((count)=>{
                res.render('success', { page: 'Success!', menuId: 'success', count: count });
            });
        };
    }
};