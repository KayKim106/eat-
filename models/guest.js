'use strict';
module.exports = (sequelize, DataTypes) => {
  var guest = sequelize.define('guest', {
    guest_name: DataTypes.STRING,
    burgerId: DataTypes.INTEGER
  }, {});
  guest.associate = function(models) {
    // associations can be defined here
  };
  return guest;
};