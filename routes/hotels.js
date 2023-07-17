const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const Room = require('../models/rooms');
const Hotel = require('../models/hotels');

router.post('/', async (req, res) => {
    try {
      const { hotel_id, name, city, stars } = req.body;
      console.log(req.body)
      const hotel = await Hotel.create({ hotel_id, name, city, stars });
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  module.exports = router;