import {combineReducers} from 'redux';
import {ADD_MESSAGE, GET_MESSAGES} from './../actions/message-actions.js';
import {UPDATE_NAME, CHANGE_PROFILE_CLASS} from './../actions/profile-actions.js';

let state = {
	profile: {
		name: 'Bob',
		age: 10
	},
	messages: []
}

export default function (initialState = state) {
	function messages(currentMessages=initialState.messages, action) {
		const messages = currentMessages.map(message => Object.assign({}, message));

		switch(action.type) {
			case ADD_MESSAGE:
				messages.push({id: messages.length + 1, message: action.message});
				break;
			case GET_MESSAGES:
				action.messages.map(function(message) {
					messages.push(message);
				})
				break;
		}

		return messages;
	}

	function profile(oldProfile=initialState.profile, action) {

		let profile = Object.assign({}, oldProfile);
		switch(action.type) {
			case UPDATE_NAME:
				profile.name = action.name;
				break;
			case CHANGE_PROFILE_CLASS:
				console.log('event passed');
				if(!profile.class) {
					profile.class = 'profile_head';
				}
				break;
		}

		return profile;
	}

	return combineReducers({messages, profile});
}