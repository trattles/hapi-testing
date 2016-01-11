import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Radium from 'radium';
class App extends Component {
	render() {
		return (
				<div>
					<h1>{this.props.request}</h1>
					<div className='nav_bar'>
						<Link to="/test">Name</Link>
						<Link to="/profile">Profile</Link>
					</div>
					{this.props.children}
				</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		request: state.request
	}
}
export default App;