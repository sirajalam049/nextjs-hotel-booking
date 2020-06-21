import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AuthService from 'models/auth';
import UserModel from 'models/user';
import { User } from 'models/user/@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import useAuth from './auth/useAuth';

export interface HeaderProps { }

const Header: FC<HeaderProps> = (props) => {

    const classes = useStyles();

    const router = useRouter();

    const { profile, logout } = useAuth();

    const handleClick = () => {
        logout();
    }

    return (
        <AppBar className={classes.header} elevation={0} position={'sticky'} >
            <Container maxWidth={'lg'} >
                <Toolbar >
                    <div className={classes.home} ><Link href={'/'} ><a><Typography color={'primary'} >Home</Typography></a></Link></div>
                    {
                        profile ?
                            <>
                                <Link href={'#'} ><a><Typography color={'primary'} >{UserModel.getName(profile)}</Typography></a></Link>
                                <Box mx={1} />
                                <Link href={'#'} ><a><Typography onClick={handleClick} color={'primary'} >{'Logout'}</Typography></a></Link>
                            </>
                            :
                            <>
                                <Link href={{ pathname: '/auth/login', query: { url: router.pathname, asUrl: router.asPath } }} ><a><Typography color={'primary'} >Login</Typography></a></Link>
                                <Box mx={1} />
                                <Link href={{ pathname: '/auth/signup', query: { url: router.pathname, asUrl: router.asPath } }} ><a><Typography color={'primary'} >Sign Up</Typography></a></Link>
                            </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        header: {
            backgroundColor: '#F5F5F5',
        },
        home: {
            flexGrow: 1
        }
    }))
})

export default Header