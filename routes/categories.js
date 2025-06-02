const express = require('express');
const router = express.Router();
const Category = require('../models/category');

//#################////#################//
//          Get all categories          //
//#################////#################//
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//#################////#################//
//      GET one category by ID          //
//#################////#################//
router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});

//#################////#################//
//         CREATE a category            //
//#################////#################//
router.post('/', async (req, res) => {
  const category = new Category({
    category: req.body.category,
    image: req.body.image
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory); // 201 = created
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//#################////#################//
//        UPDATE category by ID         //
//#################////#################//
router.patch('/:id', getCategory, async (req, res) => {
  if (req.body.category != null) {
    res.category.category = req.body.category;
  }
  if (req.body.image != null) {
    res.category.image = req.body.image;
  }

  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//#################////#################//
//        DELETE category by ID         //
//#################////#################//
router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.deleteOne();
    res.json({ message: 'Deleted Category' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//#################////#################//
//     Middleware: Get category by ID   //
//#################////#################//
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.category = category;
  next();
}

module.exports = router;
