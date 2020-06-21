import AuthService from 'models/auth';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

export interface withAuthProps { }

const withNoAuth = <P extends withAuthProps>(WrappedComponent: FC<P>) => {

    return (
        (props: P) => {

            const [loading, setLoading] = useState(true);

            const router = useRouter();

            const authenticating = () => {
                const flag = AuthService.loggedIn();
                console.log({ flag });
                if (flag) {
                    router.push('/');
                }
                setLoading(false);
            }

            useEffect(() => {
                authenticating();
            }, []);

            return (
                loading ? <div>{'...Loading'}</div> :
                    <WrappedComponent {...props} />
            )
        }
    )
}

export default withNoAuth