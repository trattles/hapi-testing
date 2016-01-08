import React, {Component} from 'react';
import { Link } from 'react-router';
const styles = require('./../css/style.scss');
class App extends Component {
	render() {
		return (
			<div>
				<h1>Main Wrapper</h1>
				<div className='nav_bar'>
					<Link to="/test">Name</Link>
					<Link to="/profile">Profile</Link>
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default App;