'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 3000});



//Sequelize stuff
import models from './models';
import bcrypt from 'bcrypt';

//React Junk
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';
import reducer from './../common/Reducers/index.js';
import { match, RouterContext} from 'react-router';
import { createLocation } from 'history';
import routeConfig from './../common/routes/Routes.js';

const handleRender = function(req, res) {
	const initialState = {
				profile: {
					name: 'Bob',
					age: 10
				},
				messages: []
			}
	const createStoreWithMiddleware = applyMiddleware( thunkMiddleware)(createStore);
	const store = createStoreWithMiddleware(reducer(initialState));
	//res(location);
	let reqLocation = createLocation(req.url);
	match({routes: routeConfig, location: req.url}, (error, redirectLocation, renderProps) => {
		// res(req.url);
		if(error) {
			res('error' + error.message);
		}
		else {
			//res(renderProps);
			const html = renderToString(
			<Provider store={store}>
				<RouterContext {...renderProps} />
			</Provider>
			);

			//const initialState = store.getState();
			
			res(renderFullPage(html, initialState));
		}
	});
}

const renderFullPage = function(html, initialState) {
	return `
		<!doctype html>
		<html>
			<head>
				<title>Please Work</title>
			</head>
			<body>
				<div id="app-mount">${html}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
				<script src="http://localhost:8888/static/bundle.js"></script>
			</body>
		</html>
	`;
}
let GoodLogOptions = {
	opsInterval: 1000,
	reporters: [{
		reporter: require('good-console'),
		events: {log: '*', response: '*'}
	},
	{
		reporter: require('good-file'),
        events: { ops: '*' },
        config: './test/fixtures/awesome_log'
	}
	]
};

server.register([
		{
			register: require('inert')
		},
		{
			register: require('good'),
			options: require('./utilities/logging.js')
		},
		{
			register: require('hapi-auth-cookie')
		}
	], (err) => {
	server.auth.strategy('session', 'cookie', {
		password: 'secret',
		cookie: 'sid-example',
		isSecure: false
	});

	server.route({
		method: 'GET',
		path: '/static/{filename}',
		handler: function (req, reply) {
			reply.file('static/' + req.params.filename);
		}
	});
	server.route({
		method: 'GET',
		path: '/favicon.ico',
		handler: function (req, res) {
			res.file('static/favicon.ico');
		}
	})
	server.route({
		method: 'GET',
		path: '/',
		handler: function(req, res) {
			res('hello world');
		}
	});
	server.route({
		method: 'GET',
		path: '/api/v1/messages',
		handler: function(req, res) {
			//let messages = Message.findAll();
			let messages = models.Message.findAll();
			res(messages);
		}
	});
	server.route({
		method: 'GET',
		path: '/api/v1/returnthis',
		handler: function(req, res) {
			res('hey there');
		}
	});
	server.route({
		method: 'POST',
		path: '/api/v1/login',
		handler: function(req, res) {
			models.User.findOne({
				where: {
					email: req.payload.email
				}
			}).then(function(user) {
				bcrypt.compare(req.payload.password, user.password, function(err, valid){
					console.log(valid);
					if(valid){
						console.log('in this part');
						req.auth.session.set(user);
						res('login successful');
					}
					else {
						res('login failed');
					}
				})
			})
		}
	});
	server.route({
		method: 'GET',
		path: '/api/v1/logout',
		config: {
			handler: function(req, res) {
				req.auth.session.clear();
				res('Logged Out');
			}
		}
	})
	server.route({
		method: 'GET',
		path: '/api/v1/authTest',
		config: {
			auth: {
				strategy: 'session'
			},
			handler: function(req, res) {
				res('you hit a successful route');
			}
		}
	});
	server.route({
		method: 'POST',
		path: '/api/v1/messages',
		handler: function(req, res) {
			models.Message.create({
				title: req.payload.title,
				message: req.payload.message
			}).then(function() {
				let resPayload = models.Message.findAll();
				res(resPayload);
			});
		}
	});
	server.route({
		method: 'POST',
		path: '/api/v1/user',
		handler: function(req, res) {
			let AuthenticationController = require('./controllers/AuthenticationController.js')
			AuthenticationController.createUser(req, res);
		}
	})
	server.route({
		method: 'GET',
		path: '/{path*}',
		handler: function(req, res) {
			handleRender(req, res);
		}
	});

	server.start(() => {
		console.log('Server running at:', server.info.uri);
	})
})
