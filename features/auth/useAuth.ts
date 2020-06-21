import AuthService from "models/auth";
import { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { ReduxStore } from "store";
import { UserReducer } from "store/user";

const useAuth = () => {

    const { user: profile } = useSelector<ReduxStore, Pick<UserReducer, 'user'>>(({ User: { user } }) => ({ user }));

    const dispatch = useDispatch();

    const setProfile = () => {
        const profile = AuthService.getProfile();
        if (profile) {
            dispatch({ type: 'USER_RECEIVED', data: profile });
        }
    }

    const logout = () => {
        AuthService.logout();
        batch(() => {
            dispatch({ type: 'USER_RECEIVED', data: undefined });
            dispatch({ type: "BOOKINGS_RECEIVED", data: [] });
        })
    }

    useEffect(setProfile, []);

    useEffect(() => {
        window.addEventListener('storage', setProfile);
        return () => window.removeEventListener('storage', setProfile);
    }, []);

    return { profile, setProfile, logout };

}

export default useAuth;