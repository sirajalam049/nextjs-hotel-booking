import React, { FC } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import Header from 'features/Header';

export interface Page1Props { }

const Page1: FC<Page1Props> = (props) => {
    const classes = useStyles();
    return (
        <Box>
            <Header />
            <Link href={'/'} >
                <a>Home</a>
            </Link>
        </Box>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({

    }))
})

export default Page1