import React, {Component} from 'react';

function handleKeyPress(ev) {
	if(ev.which === 13) {
		const trimmedName = ev.target.value.trim();

		if(trimmedName) {
			this.props.onSubmit(trimmedName);
		}

		ev.preventDefault();
	}
}

class ProfileName extends Component {
	render() {
		return (
			<div>
			<h1>{this.props.name}</h1>
			<input type='text' defaultValue={this.props.name} onKeyPress={handleKeyPress.bind(this)}/>
			</div>

		);
	}
}



export default ProfileName;