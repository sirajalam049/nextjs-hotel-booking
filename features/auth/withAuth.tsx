import AuthService from 'models/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStore } from 'store';
import { UserReducer } from 'store/user';

export interface withAuthProps { }

const withAuth = <P extends withAuthProps>(WrappedComponent: FC<P>) => {

    return (
        (props: P) => {

            const [loading, setLoading] = useState(true);

            const { user } = useSelector<ReduxStore, UserReducer>(({ User: { user } }) => ({ user }));

            const dispatch = useDispatch();

            const router = useRouter();

            const authenticating = () => {
                const flag = AuthService.loggedIn();
                if (!flag) {
                    router.push('/');
                    if (user) {
                        dispatch({ type: "RESET" });
                    }
                }
                setLoading(false);
            }

            useEffect(() => {
                authenticating();
            }, [user]);

            return (
                loading ? 'Loading...' :
                    <WrappedComponent {...props} />
            )
        }
    )
}


export default withAuth