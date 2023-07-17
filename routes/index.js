var express = require('express');
var router = express.Router();
const Hotel = require('../models/hotels');

router.post('/hotels/', async (req, res) => {
    try {
      const { hotel_id, name, city, stars } = req.body;
      console.log(req.body)
      const hotel = await Hotel.create({ hotel_id, name, city, stars });
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  // router.get('/hotels', async (req, res) => {
  //   try {
  //     const hotels = await Hotel.findAll();
  //     res.json(hotels);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to fetch users' });
  //   }
  // });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
