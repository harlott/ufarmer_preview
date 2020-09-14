import { createStore as reduxCreateStore, combineReducers } from "redux";
import menu from './menu';
import formModal from './formModal';
import modal from "./modal";

const initialState = {};
const rootReducer = combineReducers({
    menu,
    formModal,
    modal,
});
const createStore = () => reduxCreateStore(rootReducer, initialState)
export default createStore