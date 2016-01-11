import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActionCreators from './../actions/profile-actions.js';
import ProfileName from './ProfileName.jsx';
import Radium from 'radium';

class Profile extends Component {
	render() {
		return (
			<div style={[styles.base]}>
				<h1 className={this.props.profile.class + ' thing'}>Hello from Profile Component</h1>
				<p>{this.props.profile.name}</p>
				<ProfileName name={this.props.profile.name} onSubmit={this.props.updateName} />
				<div onClick={this.props.changeProfileClass}>Click Me</div>
			</div>
		);
	}
}

var styles = {
	base: {
		backgroundColor: 'pink',
		color: 'green',
		fontFamily: 'serif',
		position: 'relative',
		left: '0px',
		transition: 'all 1s',
		':hover': {
			backgroundColor: 'blue',
			left: '10px'
		}
	}
};

function mapStateToProps(state){
	return {
		profile: state.profile
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(profileActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Profile));