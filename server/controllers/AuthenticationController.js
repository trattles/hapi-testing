'use strict';

import bcrypt from 'bcrypt';
import models from './../models';
import Sequelize from 'sequelize';

let AuthenticationController = {
	createUser: function(req, res) {
		let email = req.payload.email;
		let password = req.payload.password;
		let hashPass = 'hello';
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync('test', salt);
		
		models.User.create({
			email: req.payload.email,
			password: hash
		}).then(function() {
			models.User.findAll({
				where: {
					email: req.payload.email
				}
			}).then(function(user) {
				console.log(user);
				res(user);
			})
		}).catch(Sequelize.ValidationError, function(err){
			console.log(err);
			res(err.message);
		}).catch(function(err){
			console.log(err);
			res(err.message);
		});
	}
}

module.exports = AuthenticationController;