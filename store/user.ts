import { Reducer } from "redux";
import { User } from "models/user/@types";

export interface UserReducer {
    user?: User;
}

const UserReducer: Reducer<UserReducer> = (state = {}, action) => {
    switch (action.type) {
        case "USER_RECEIVED": state = { ...state, user: action.data }
        default: return state;
    }
}

export default UserReducer;