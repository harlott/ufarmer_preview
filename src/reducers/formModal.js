const ACTIVATED = 'cws-site/form-modal/ACTIVATED';
const DEACTIVATED = 'cws-site/form-modal/DEACTIVATED';

const initialState = { active: false, formId: undefined };

export function activate(formId) {
	return {
		type: ACTIVATED,
        payload: {
		    formId: formId,
        }
	}
}

export function deactivate() {
	return {
		type: DEACTIVATED
	}
}

export default function formModal( state = initialState, action) {
  switch (action.type) {
    case ACTIVATED:
      return Object.assign({}, state, { active: true, formId: action.payload.formId });
    case DEACTIVATED:
      return Object.assign({}, state, initialState);
    default:
        return state;
  }
}

