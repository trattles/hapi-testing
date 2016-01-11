export const UPDATE_NAME = 'update-name';
export const CHANGE_PROFILE_CLASS = 'change-profile-class';

export function updateName(name) {
	return {type: UPDATE_NAME, name };
}

export function changeProfileClass() {
	return {type: CHANGE_PROFILE_CLASS}
}