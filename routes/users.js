var express = require('express');
var router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a specific user by ID
router.get('/:email', async (req, res) => {
  const userEmail = req.params.email;
  console.log(userEmail);
  try {
    const user = await User.findOne({
      where: {
        email: userEmail
      }
    });
    console.log(user);
    if (user) {
      console.log(1);
      res.json({response:'true'});
    } else {
      console.log(2);
      res.json({response:'false'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.update({ name, email });
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;


