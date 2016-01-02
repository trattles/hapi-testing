import React, {Component} from 'react';

class MessageBox extends Component {
	render() {
		return(
			<div className='message-box'>
				<textarea
					name='message'
					onKeyPress={this.handleKeyPress.bind(this)}/>
			</div>
		);
	}

	handleKeyPress(ev) {
		if (ev.which === 13) {
			const trimmedMessage = ev.target.value.trim();

			if (trimmedMessage) {
				this.props.onSubmit(trimmedMessage);
				ev.target.value = '';
			}
			
			ev.preventDefault();
		}
	}
}

export default MessageBox;