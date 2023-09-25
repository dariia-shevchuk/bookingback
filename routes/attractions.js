const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
// const Room = require('../models/rooms');
const Attraction = require('../models/attraction');

// router.post('/', async (req, res) => {
//     try {
//       const { hotel_id, name, city, stars } = req.body;
//       console.log(req.body)
//       const hotel = await Hotel.create({ hotel_id, name, city, stars });
//       res.json(hotel);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   });

  router.get('/', async (req, res) => {
    try {
      const attractions = await Attraction.findAll();
      res.json(attractions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  router.post('/', async (req, res) => {
    try{
      const { 
        house_id, 
        name, 
        price, 
        price_type, 
        stock, 
        maxGuests, 
        availability 
      } = req.body;
      console.log(req.body)
      const attraction = await Attraction.create({ house_id, name, price, price_type, stock, maxGuests, availability });
      res.json(attraction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create attraction' });
    }
  })

  router.get('/:id', async(req, res) => {
    try{
      const houseId = req.params.id;
      const attractinsInHouse = await Attraction.findAll({
        where: {
          house_id: houseId // This condition filters rooms based on the hotel IDs found in Step 1
        },
      });
      res.json(attractinsInHouse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create attraction' });
    }
  })

//   router.get('/:id', async (req, res) => {
//     const hotelId = req.params.id;
//     try {
//       console.log(hotelId)
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch user' });
//     }
//   });

  module.exports = router;
