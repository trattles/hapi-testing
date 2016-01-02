export const UPDATE_NAME = 'update-name';

export function updateName(name) {
	return {type: UPDATE_NAME, name };
}