const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lungxcan_db', 'root', 'z"F~>T+^/k$V/E|c', {
  host: '34.101.228.96',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
