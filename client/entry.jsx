import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const history = createBrowserHistory();
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

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<Route path="test" component={Name} />
				<Route path="profile" component={Profile} />
				<Route path="messages" component={Messages} />
			</Route>
		</Router>
	</Provider>
, document.getElementById('app-mount'));