const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

//#################////#################//
//          Get all recipes             //
//#################////#################//
router.get('/', async ( req, res) => {
    try {
        const recipes = await Recipe.find()
        res.json(recipes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//#################////#################//
//       GET one  /recipes/:id          //
//#################////#################//
router.get('/:id', getRecipe, (req, res) => {
    res.json(res.recipe)
})


//#################////#################//
//         CREATE /recipes              //
//#################////#################//
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    image: req.body.image,
    description: req.body.description,
    pasos: req.body.pasos,
    idcategory: req.body.idcategory,
    time: req.body.time,
    serving: req.body.serving,
    calories: req.body.calories,
    dificulty: req.bodydificulty
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//#################////#################//
//          UPDATE /recipes/:id         //
//#################////#################//
router.patch('/:id', getRecipe, async (req, res) => {
    if (req.body.name != null) {
        res.recipe.name = req.body.name
    }
    if (req.body.ingredients != null) {
        res.recipe.ingredients = req.body.ingredients
    }
    if (req.body.image != null) {
        res.recipe.image = req.body.image
    }
    if (req.body.description != null) {
        res.recipe.description = req.body.description
    }
    if (req.body.pasos != null) {
        res.recipe.pasos = req.body.pasos
    }
    if (req.body.  idcategory != null) {
        res.recipe.idcategory = req.body.idcategory
    }
    if (req.body.time != null) {
        res.recipe.time = req.body.time
    }
    if (req.body.serving != null) {
        res.recipe.serving = req.body.serving
    }
    if (req.body.calories != null) {
        res.recipe.calories = req.body.calories
    }
    if (req.body.dificulty != null) {
        res.recipe.dificulty = req.body.dificulty
    }

    try {
        const updatedRecipe = await res.recipe.save()
        res.json(updatedRecipe)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//#################////#################//
//          DELETE /recipes/:id         //
//#################////#################//
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.deleteOne();
    res.json({ message: 'Deleted Recipe' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



async function getRecipe(req, res, next) {
    let recipe
    try {
        recipe = await Recipe.findById(req.params.id)
        if (recipe == null) {
            return res.status(404).json({ message: 'Cannot find recipe' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.recipe = recipe
    next()
}

module.exports = router;
