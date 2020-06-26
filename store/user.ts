import { Reducer } from "redux";
import { User } from "models/user/@types";
import { Booking } from "models/booking/@types";

export interface UserReducer {
    user?: User;
    bookings?: Booking[];
}

const UserReducer: Reducer<UserReducer> = (state = {}, action) => {
    switch (action.type) {
        case "USER_RECEIVED": return { ...state, user: action.data }
        case "BOOKINGS_RECEIVED": return { ...state, bookings: action.data }
        default: return state;
    }
}

export default UserReducer;