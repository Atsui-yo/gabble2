'use strict';
module.exports = function(sequelize, DataTypes) {
  var Likes = sequelize.define('Likes', {
    active: { type: DataTypes.STRING, allowNull: false, defaultValue: false }
  });
  Likes.associate = function(models) {
    Likes.belongsTo(models.Users, { foreignKey: 'id' });
    Likes.belongsTo(models.Messages, { foreignKey: 'id' });
  }
  return Likes;
};