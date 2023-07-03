const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/users.sqlite', // Path to your SQLite database file
});

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './databases/users.db',
  },
  // Other environments (e.g., production, test) if needed
};