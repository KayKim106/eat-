'use strict';
module.exports = (sequelize, DataTypes) => {
  var burger = sequelize.define('burger', {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  }, {});
  burger.associate = function(models) {
    // associations can be defined here
    burger.hasOne(models.guest)
  };
  return burger;
};