const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../database');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});
const House = require('./house'); // Import the Hotel model

class Attraction extends Model {}

Attraction.init(
  {house_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock :{
    type: DataTypes.STRING,
    allowNull: true,
  },
  maxGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  },
  {
    sequelize,
    modelName: 'Attraction',
    tableName: 'Attractions',
  }
);

// Set up the association between Room and Hotel
Attraction.belongsTo(House, { foreignKey: 'house_id' }); // This assumes that the foreign key in the Rooms table is named 'hotel_id'

// module.exports = Room;

// Create the table

// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('House table created successfully.');
//   } catch (error) {
//     console.error('Error creating House table:', error);
//   }
// })();

module.exports = Attraction;
