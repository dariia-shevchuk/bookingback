const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});

const Hotel = sequelize.define('Hotel', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  hotel_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

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