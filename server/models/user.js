'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true,
				notEmpty: true
			}
		},
		password: {
			type: DataTypes.STRING,
			field: 'password',
			validate: {
				notEmpty:true,
				min: 8
			}
		}
	}, {
		classMethods: {
			associate: function (models) {

			}
		}
	});
	return User;
};