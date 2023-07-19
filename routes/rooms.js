const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();
const Room = require('../models/rooms');
const Hotel = require('../models/hotels');

router.post('/', async (req, res) => {
  try {
    const { hotel_id, price, maxGuests, availabilityOfBreakfast, availabilityOfParking, availability } = req.body;
    console.log(req.body)
    const room = await Room.create({ hotel_id, price, maxGuests, availabilityOfBreakfast, availabilityOfParking, availability });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
// router.get('/', async (req, res) => {
//   try {
//     const rooms = await Room.findAll();
//     res.json(rooms);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

router.get('/', async (req, res) => {
  const city = req.query.city;
  const numberOfPeople = req.query.numberOfPeople;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const numberOfStars = req.query.numberOfStars;
  const availabilityOfBreakfast = req.query.availabilityOfBreakfast === 'true'; // Convert to boolean
  // const availabilityOfParking = req.query.availabilityOfParking === 'true'; // Convert to boolean
  console.log(city);
  console.log(numberOfPeople);
  console.log(minPrice);
  console.log(maxPrice);
  console.log(numberOfStars);
  console.log(availabilityOfBreakfast);

  try {
    // Step 1: Find all hotel IDs in the given city with the specified number of stars
    const hotelsInCity = await Hotel.findAll({
      attributes: ['hotel_id'],
      where: {
        city: city,
        stars: {
          [Op.gte]: numberOfStars, // Filter based on the number of stars (greater than or equal to)
        },
      },
    });

    // Extract hotel IDs from the result
    const hotelIds = hotelsInCity.map((hotel) => hotel.hotel_id);
    console.log(hotelsInCity)
    // Step 2: Find all rooms that belong to the hotels in the given city and meet the max_guests and price criteria
    const roomsInCity = await Room.findAll({
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
        availabilityOfBreakfast: availabilityOfBreakfast, // Filter based on availability of breakfast
        // availabilityOfParking: availabilityOfParking, // Filter based on availability of parking
        availability: true,
      },
      include: [
        {
          model: Hotel,
          attributes: ['name', 'stars'],
        },
      ],
    });
    console.log(roomsInCity);
    res.json(roomsInCity); // Respond with the filtered rooms data along with hotel name and stars
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Get a specific user by ID /${this.numberOfPeople}
// router.get('/:city/:maxguests', async (req, res) => {
//   const city = req.params.city;
//   const maxGuests = req.params.maxguests;

//   try {
//     // Step 1: Find all hotel IDs in the given city
//     const hotelsInCity = await Hotel.findAll({
//       attributes: ['hotel_id'],
//       where: {
//         city: city
//       }
//     });

//     // Extract hotel IDs from the result
//     const hotelIds = hotelsInCity.map((hotel) => hotel.hotel_id);
//     console.log(hotelsInCity);
//     console.log(hotelIds[0]);
//     // Step 2: Find all rooms that belong to the hotels in the given city and meet the max_guests criteria
//     const roomsInCity = await Room.findAll({
//       where: {
//         hotel_id: {
//           [Op.in]: hotelIds // This condition filters rooms based on the hotel IDs found in Step 1
//         },
//         maxGuests: {
//           [Op.gte]: maxGuests // This condition filters rooms based on max_guests (greater than or equal to)
//         },
//         availability: true,
//       }
//     });

//     res.json(roomsInCity); // Respond with the filtered rooms data
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch rooms' });
//   }
// });

router.get('/:city/:maxguests', async (req, res) => {
  const city = req.params.city;
  const maxGuests = req.params.maxguests;

  try {
    // Step 1: Find all hotel IDs in the given city
    const hotelsInCity = await Hotel.findAll({
      attributes: ['hotel_id', 'name', 'stars'], // Include 'name' and 'stars' attributes in the result
      where: {
        city: city
      }
    });

    // Extract hotel IDs from the result
    const hotelIds = hotelsInCity.map((hotel) => hotel.hotel_id);
    
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
      },
      include: [
        {
          model: Hotel, // Include the Hotel model in the query
          attributes: ['name', 'stars'], // Select the 'name' and 'stars' attributes of the hotel
        },
      ],
    });

    res.json(roomsInCity); // Respond with the filtered rooms data along with hotel name and stars
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

module.exports = router;


