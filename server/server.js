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
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';
import reducer from './../common/Reducers/index.js';
import { match, RouterContext} from 'react-router';
import { createLocation } from 'history';
import routeConfig from './../common/routes/Routes.js';
import Radium, {Style, StyleRoot} from 'radium';
import Normalize from './../common/styles/Normalize.js';
import { syncHistory, routeReducer } from 'redux-simple-router';

const handleRender = function(req, res) {
	const initialState = {
				
				profile: {
					name: 'Bobss',
					age: 10
				}
			}
	const combinedReducers = combineReducers(Object.assign({}, reducer, {routing: routeReducer}));
	
	const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
	const store = createStoreWithMiddleware(combinedReducers, initialState);
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
			<Provider store={store} radiumConfig={{userAgent: req.headers['user-agent']}}>
				<StyleRoot radiumConfig={{userAgent: req.headers['user-agent']}}>
					<RouterContext {...renderProps} />
					<Style rules={Normalize} />
				</StyleRoot>
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
	var routes = require('./routes');
	server.route(routes);
	server.route({
		method: 'GET',
		path: '/{path*}',
		handler: function(req, res) {
			handleRender(req, res);
		}
	});
	if (!module.parent) {
		server.start(() => {
			console.log('Server running at:', server.info.uri);
		})
	}
})

module.exports = server;
