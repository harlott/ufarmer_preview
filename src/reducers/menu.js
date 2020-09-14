const ACTIVATED = 'cws-site/menu-active/ACTIVATED';
const DEACTIVATED = 'cws-site/menu-active/DEACTIVATED';

const initialState = { active: false };

export function activate() {
	return {
		type: ACTIVATED
	}
}

export function deactivate() {
	return {
		type: DEACTIVATED
	}
}

function menu( state = initialState, action) {
  switch (action.type) {
    case ACTIVATED:
      return Object.assign({}, state, { active: true });
    case DEACTIVATED:
      return Object.assign({}, state, { active: false });
    default:
        return state;
  }
}

export default menu;