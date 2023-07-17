const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/booking.db',
});

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostel_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availability: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
});

// Create the table
// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Users table created successfully.');
//   } catch (error) {
//     console.error('Error creating Users table:', error);
//   }
// })();

module.exports = User;