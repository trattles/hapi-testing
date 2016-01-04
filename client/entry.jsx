import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

//import Routes from './../common/routes/Routes.js';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './../common/Reducers/index.js';
import thunkMiddleware from 'redux-thunk';

const initialState = window.__INITIAL_STATE__;
const createStoreWithMiddleware = applyMiddleware( thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers(initialState));

//Components
import App from './../common/components/App.jsx';
import Name from './../common/components/Name.jsx';
import Profile from './../common/components/Profile.jsx';
import Messages from './../common/components/Messages.jsx';

import routeConfig from './../common/routes/Routes.js';

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routeConfig} history={browserHistory}>
		</Router>
	</Provider>
, document.getElementById('app-mount'));