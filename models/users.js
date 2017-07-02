'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });
  Users.associate = function(models) {
    Users.hasMany(models.Messages);
    Users.hasMany(models.Likes);
  }

  return Users;
};