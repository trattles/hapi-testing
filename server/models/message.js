'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Message;
};