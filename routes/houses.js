const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const House = require('../models/house');

router.post('/', async (req, res) => {
  try {
    const {
      house_id ,
      name,
      price,
      city,
      maxGuests,
      availability,
    } = req.body;
    console.log(req.body);
    const house = await House.create({house_id, name, price, city, maxGuests, availability});
    res.json(house);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create house' });
  }
});

router.get('/', async (req, res) => {
    const city = req.query.city;
    const numberOfPeople = req.query.numberOfPeople;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    // const availabilityOfParking = req.query.availabilityOfParking === 'true'; // Convert to boolean
    console.log(city);
    console.log(numberOfPeople);
    console.log(minPrice);
    console.log(maxPrice);
    console.log(numberOfStars);
    console.log(availabilityOfBreakfast);
  
    try {
      // Step 1: Find all hotel IDs in the given city with the specified number of stars
      const hotelsInCity = await House.findAll({
        attributes: ['house_id'],
        where: {
          city: city,
          stars: {
            [Op.gte]: numberOfStars, // Filter based on the number of stars (greater than or equal to)
          },
        },
      });
  
      // Extract hotel IDs from the result
      console.log(hotelsInCity)
      // Step 2: Find all rooms that belong to the hotels in the given city and meet the max_guests and price criteria
      const housesInCity = await House.findAll({
        where: {
          hotel_id: {
            [Op.in]: hotelIds,
          },
          maxGuests: {
            [Op.gte]: numberOfPeople,
          },
          price: {
            [Op.between]: [minPrice, maxPrice], // Filter based on the price range
          },
          // availabilityOfParking: availabilityOfParking, // Filter based on availability of parking
        },
      });
      console.log(roomsInCity);
      res.json(roomsInCity); // Respond with the filtered rooms data along with hotel name and stars
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  });

  router.get('/:city/:maxguests', async (req, res) => {
    const city = req.params.city;
    const maxGuests = req.params.maxguests;
  
    try {
      // Step 1: Find all rooms that belong to the hotels in the given city and meet the max_guests criteria
      const housesInCity = await House.findAll({
        where: {
          city: city,
          maxGuests: {
            [Op.gte]: maxGuests // This condition filters rooms based on max_guests (greater than or equal to)
          },
          availability: true,
        },
      });
  
      res.json(housesInCity); // Respond with the filtered rooms data along with hotel name and stars
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  });

  module.exports = router;
