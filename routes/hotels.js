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

  router.get('/', async (req, res) => {
    try {
      const hotels = await Hotel.findAll();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  router.get('/:id', async (req, res) => {
    const hotelId = req.params.id;
    try {
      console.log(hotelId)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  module.exports = router;