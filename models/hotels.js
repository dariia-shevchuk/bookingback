// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './databases/booking.db',
// });

// const Hotel = sequelize.define('Hotel', {
//   hotel_id: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   city: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   stars: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../database');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databases/booking.db',
  });
class Hotel extends Model {}

Hotel.init(
  {
    // Define the attributes of the Hotel model
    hotel_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    city: {
            type: DataTypes.STRING,
            allowNull: false,
            },
    },
    {
        sequelize,
        modelName: 'Hotel',
        tableName: 'Hotels',
    }
);

// module.exports = Hotel;
// Create the table
// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Hotels table created successfully.');
//   } catch (error) {
//     console.error('Error creating Users table:', error);
//   }
// })();

module.exports = Hotel;