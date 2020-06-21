import { combineReducers } from "redux";
import UserReducer from "./user";

const RootReducer = combineReducers({
    User: UserReducer
});

export type ReduxStore = ReturnType<typeof RootReducer>

export default RootReducer;