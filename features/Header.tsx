import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { Typography, Container, AppBar, Toolbar, Box } from '@material-ui/core';
import Link from 'next/link';

export interface HeaderProps { }

const Header: FC<HeaderProps> = (props) => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header} elevation={0} position={'sticky'} >
            <Container maxWidth={'lg'} >
                <Toolbar >
                    <div className={classes.home} ><Link href={'/'} ><a><Typography color={'primary'} >Home</Typography></a></Link></div>
                    <Link href={'/auth/login'} ><a><Typography color={'primary'} >Login</Typography></a></Link>
                    <Box mx={1} />
                    <Link href={'/auth/signup'} ><a><Typography color={'primary'} >Sign Up</Typography></a></Link>
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