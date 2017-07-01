'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: { type: DataTypes.STRING, allowNull: false },
    displayname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });
  users.associate = function(models) {
    users.hasMany(models.messages);
    users.hasMany(models.likes);
  }

  return users;
};