import React, { FC } from 'react'
import { Box, Paper } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface FormContainerProps { }

const FormContainer: FC<FormContainerProps> = (props) => {
    const classes = useStyles();
    const { children } = props;
    return (
        <div className={classes.root} >
            <Paper className={classes.paper} >
                {children}
            </Paper>
        </div>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        root: {
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#fff'
        },
        paper: {
            width: 400,
            borderRadius: 12,
            padding: 24
        }
    }))
})

export default FormContainer