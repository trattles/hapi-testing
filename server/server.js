'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 3000});

//Sequelize stuff
import sequelize from './models';
import Message from './models/message.js';

//React Junk
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';
import reducer from './../common/Reducers/index.js';
import { match, RoutingContext } from 'react-router';
import Routes from './../common/routes/Routes.js';

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
	match({routes: Routes, location: req.url}, (error, redirectLocation, renderProps) => {
		//res(req.url);
		if(error) {
			res(error.message);
		}
		else {
			const html = renderToString(
			<Provider store={store}>
				<RoutingContext {...renderProps} />
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
				<script src="/static/bundle.js"></script>
			</body>
		</html>
	`;
}

server.register(require('inert'), (err) => {
	server.route({
		method: 'GET',
		path: '/static/{filename}',
		handler: function (req, reply) {
			reply.file('static/' + req.params.filename);
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
			let messages = Message.findAll();
			res(messages);
		}
	});
	server.route({
		method: 'POST',
		path: '/api/v1/messages',
		handler: function(req, res) {
			Message.create({
				message: req.payload.message
			}).then(function() {
				let resPayload = Message.findAll();
				res(resPayload);
			});
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
