import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActionCreators from './../actions/message-actions.js';

import MessageList from './MessageList.jsx';
import MessageBox from './MessageBox.jsx';

class Messages extends Component {
	render() {
		return (
			<div>
				<h1>Messages</h1>
				<MessageList messages={this.props.messages} />
				<MessageBox onSubmit={this.props.createMessage} />
				<div onClick={this.props.requestMessages} >Click me</div>
			</div>
		)
	}
	componentWillMount() {
		console.log('mounting');
		this.props.requestMessages();
	}
}

function mapStateToProps(state) {
	return {
		messages: state.messages
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(messageActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);