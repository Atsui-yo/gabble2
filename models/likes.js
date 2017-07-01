'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    active: { type: DataTypes.STRING, allowNull: false, defaultValue: false }
  });
  likes.associate = function(models) {
    likes.belongsTo(models.users, { foreignKey: 'id' });
    likes.belongsTo(models.messages, { foreignKey: 'id' });
  }
  return likes;
};