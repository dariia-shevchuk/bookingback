const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const Room = require('../models/rooms');
const Hotel = require('../models/hotels');

router.post('/', async (req, res) => {
  try {
    const { hotel_id, price, maxGuests, bed, availability } = req.body;
    console.log(req.body)
    const room = await Room.create({ hotel_id, price, maxGuests, bed, availability });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a specific user by ID /${this.numberOfPeople}
router.get('/:city/:maxguests', async (req, res) => {
  const city = req.params.city;
  const maxGuests = req.params.maxguests;

  try {
    // Step 1: Find all hotel IDs in the given city
    const hotelsInCity = await Hotel.findAll({
      attributes: ['hotel_id'],
      where: {
        city: city
      }
    });

    // Extract hotel IDs from the result
    const hotelIds = hotelsInCity.map((hotel) => hotel.hotel_id);
    console.log(hotelsInCity);
    console.log(hotelIds[0]);
    // Step 2: Find all rooms that belong to the hotels in the given city and meet the max_guests criteria
    const roomsInCity = await Room.findAll({
      where: {
        hotel_id: {
          [Op.in]: hotelIds // This condition filters rooms based on the hotel IDs found in Step 1
        },
        maxGuests: {
          [Op.gte]: maxGuests // This condition filters rooms based on max_guests (greater than or equal to)
        },
        availability: true,
      }
    });

    res.json(roomsInCity); // Respond with the filtered rooms data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

module.exports = router;


