import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

export interface HeaderProps { }

const Header: FC<HeaderProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.header} >

        </div>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        header: {

        }
    }))
})

export default Header