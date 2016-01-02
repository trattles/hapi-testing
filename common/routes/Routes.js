import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';

//Components
import App from './../components/App.jsx';
import Name from './../components/Name.jsx';
import Profile from './../components/Profile.jsx';
import Messages from './../components/Messages.jsx';

export default (
	<Route path="/" component={App}>
		<Route path="test" component={Name} />
		<Route path="profile" component={Profile} />
		<Route path="messages" component={Messages} />
	</Route>
);
			
