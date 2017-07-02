'use strict';
module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define('Messages', {
    content: { type: DataTypes.STRING, allowNull: false }
  });

  Messages.associate = function(models) {
    Messages.belongsTo(models.Users, { foreignKey: 'UserId' });
    Messages.hasMany(models.Likes, { foreignKey: 'MessageId' });
  }

  return Messages;
};

