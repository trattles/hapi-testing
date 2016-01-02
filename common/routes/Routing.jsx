import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const history = createBrowserHistory();

import Routes from './Routes.js';

class Routing extends Component {
	render(){
		return(
			<Router history={history}>
				<Routes />
			</Router>
		);
	}
}

export default Routing