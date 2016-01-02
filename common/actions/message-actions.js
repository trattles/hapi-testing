import request from 'superagent';

export const ADD_MESSAGE = 'add-message';
export const GET_MESSAGES = 'get-message';

export function addMessage(message) {
	return { type: ADD_MESSAGE, message };
}
export function getMessages(data) {
	return { type: GET_MESSAGES, messages: data }
}
export function requestMessages() {
	return dispatch => {
		return request('GET', '/api/v1/messages').end(function(err, data) {
			dispatch(getMessages(JSON.parse(data.text)));
		});
	}
}
export function createMessage(message) {
	return dispatch => {
		dispatch(addMessage(message));

		return request.post('/api/v1/messages')
			.set('Content-Type', 'application/json')
			.send('{"message":' + '"' + message + '"}')
			.end();
	}
}