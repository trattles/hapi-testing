import React, {Component} from 'react';

class MessageList extends Component {
	render() {
		return (
			<ul>
				{this.props.messages.map((message, index) => {
					return (
						<li key={`message-${index}`}>
							{message.message}
						</li>
					);
				})}
			</ul>
		);
	}
}

export default MessageList;