const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../database');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});
// const Hotel = require('./hotels'); // Import the Hotel model

class House extends Model {}

House.init(
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
  city: {
    type: DataTypes.STRING,
    allowNull: false,
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
    modelName: 'House',
    tableName: 'Houses',
  }
);

// Set up the association between Room and Hotel
// House.belongsTo(Hotel, { foreignKey: 'hotel_id' }); // This assumes that the foreign key in the Rooms table is named 'hotel_id'

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

module.exports = House;