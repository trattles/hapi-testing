import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from './../common/Reducers/index.js';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'redux-simple-router';

const reducer = combineReducers(Object.assign({}, reducers, {routing: routeReducer }));
const initialState = window.__INITIAL_STATE__;
const simpleRouter = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, simpleRouter)(createStore);

const store = createStoreWithMiddleware(reducer(initialState));
simpleRouter.syncHistoryToStore(store);

//Components

import routeConfig from './../common/routes/Routes.js';
import Radium, {Style, StyleRoot} from 'radium';
import Normalize from './../common/styles/Normalize.js';



ReactDOM.render(
	<Provider store={store}>
		<StyleRoot>
		<Router routes={routeConfig} history={browserHistory}>
		</Router>
		<Style rules={Normalize} />
		</StyleRoot>
	</Provider>
, document.getElementById('app-mount'));