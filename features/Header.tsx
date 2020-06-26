import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import useAuth from './auth/useAuth';
import UserModel from 'models/user';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStore } from 'store';
import { UserReducer } from 'store/user';

export interface HeaderProps { }

const Header: FC<HeaderProps> = (props) => {

    const classes = useStyles();

    const router = useRouter();

    const { profile, logout } = useAuth();

    const { bookings } = useSelector<ReduxStore, Pick<UserReducer, 'bookings'>>(({ User: { bookings } }) => ({ bookings }));

    const dispatch = useDispatch();

    const handleClick = () => {
        logout();
    }

    const getBookings = async (userId: string) => {
        const bookings = await UserModel.getAllBookings(userId).catch(err => { throw err });
        dispatch({ type: "BOOKINGS_RECEIVED", data: (bookings || []) });
    }

    useEffect(() => {
        if (profile?.id && !bookings) {
            getBookings(profile.id);
        }
    }, [profile])

    let drafts = bookings?.filter(b => b.inDraft).length || 0;

    let bookingCount = (bookings?.length || 0) - drafts;

    return (
        <AppBar className={classes.header} elevation={0} position={'sticky'} >
            <Container maxWidth={'lg'} >
                <Toolbar >
                    <div className={classes.home} >
                        <Link href={'/'} ><a><Typography color={'primary'} >Home</Typography></a></Link>
                        <Box mx={1}>|</Box>
                        {profile ? <Typography >{`Hello, ${profile.firstName}`}</Typography> : null}
                    </div>
                    {
                        profile ?
                            <>
                                <Link href={'#'} ><a><Typography color={'primary'} >{`Drafts (${drafts})`}</Typography></a></Link>
                                <Box mx={1}>|</Box>
                                <Link href={'#'} ><a><Typography color={'primary'} >{`Bookings (${bookingCount})`}</Typography></a></Link>
                                <Box mx={1}>|</Box>
                                <Link href={'#'} ><a><Typography onClick={handleClick} color={'primary'} >{'Logout'}</Typography></a></Link>
                            </>
                            :
                            <>
                                <Link href={{ pathname: '/auth/login', query: { url: router.pathname, asUrl: router.asPath } }} ><a><Typography color={'primary'} >Login</Typography></a></Link>
                                <Box mx={1}>|</Box>
                                <Link href={{ pathname: '/auth/signup', query: { url: router.pathname, asUrl: router.asPath } }} ><a><Typography color={'primary'} >Sign Up</Typography></a></Link>
                            </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const useStyles = makeStyles<Theme>((theme) => {

    const { palette: { text } } = theme;

    return (createStyles({
        header: {
            backgroundColor: '#F5F5F5',
            color: text.primary
        },
        home: {
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center'
        }
    }))
})

export default Header