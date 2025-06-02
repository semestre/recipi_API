const express = require('express');
const router = express.Router();
const User = require('../models/user');

//#################////#################//
//           GET all /users             //
//#################////#################//
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//#################////#################//
//         GET one /users/:id           //
//#################////#################//
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

//#################////#################//
//          CREATE /users               //
//#################////#################//
router.post('/', async (req, res) => {
  try {
    const { username, password, image } = req.body; 

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

    const user = new User({
      username,
      password,
      image
    });

    const newUser = await user.save();
    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//#################////#################//
//         UPDATE /users/:id            //
//#################////#################//
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) res.user.username = req.body.username;
  if (req.body.password != null) res.user.password = req.body.password;
  if (req.body.image != null) res.user.image = req.body.image;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//#################////#################//
//         DELETE /users/:id            //
//#################////#################//
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: 'Deleted User' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
