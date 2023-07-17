const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});

const Room = sequelize.define('Room', {
      hotel_id: {
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
      bed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
});

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