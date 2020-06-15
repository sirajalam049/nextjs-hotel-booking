import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

export interface HeaderProps { }

const Header: FC<HeaderProps> = (props) => {
    const classes = useStyles();
    return (
        <AppBar position={'static'} >
            <Toolbar>
                <Typography className={classes.title} >Home</Typography>
                <Typography>Login | Sign Up</Typography>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        title: {
            flexGrow: 1
        }
    }))
})

export default Header