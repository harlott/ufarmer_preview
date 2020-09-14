const ACTIVATED = 'cws-site/modal/ACTIVATED';
const DEACTIVATED = 'cws-site/modal/DEACTIVATED';

const initialState = { active: false, modalId: undefined };

export function activate(modalId) {
    return {
        type: ACTIVATED,
        payload: {
            modalId: modalId,
        }
    }
}

export function deactivate() {
    return {
        type: DEACTIVATED
    }
}

export default function modal( state = initialState, action) {
    switch (action.type) {
        case ACTIVATED:
            return Object.assign({}, state, { active: true, modalId: action.payload.modalId });
        case DEACTIVATED:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}

