// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './databases/booking.db',
// });

// const Room = sequelize.define('Room', {
//       hotel_id: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       price: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       maxGuests: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       bed: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       availability: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
// });

const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../database');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});
const Hotel = require('./hotels'); // Import the Hotel model

class Room extends Model {}

Room.init(
  {hotel_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availabilityOfBreakfast: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // availabilityOfParking: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  },
  {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms',
  }
);

// Set up the association between Room and Hotel
Room.belongsTo(Hotel, { foreignKey: 'hotel_id' }); // This assumes that the foreign key in the Rooms table is named 'hotel_id'

// module.exports = Room;

// Create the table
// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Room table created successfully.');
//   } catch (error) {
//     console.error('Error creating Users table:', error);
//   }
// })();

module.exports = Room;