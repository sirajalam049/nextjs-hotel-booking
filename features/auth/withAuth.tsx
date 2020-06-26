import AuthService from 'models/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState, FC } from 'react';

export interface withAuthProps { }

const withAuth = <P extends withAuthProps>(WrappedComponent: FC<P>) => {

    return (
        (props: P) => {

            const [loading, setLoading] = useState(true);

            const router = useRouter();

            const authenticating = () => {
                const flag = AuthService.loggedIn();
                if (!flag) {
                    router.push('/');
                }
                setLoading(false);
            }

            useEffect(() => {
                authenticating();
            }, []);

            return (
                loading ? 'Loading...' :
                    <WrappedComponent {...props} />
            )
        }
    )
}


export default withAuth