import React, { FC } from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ReduxStore } from 'store';
import { UserReducer } from 'store/user';
import { useSelector } from 'react-redux';
import Header from 'features/Header';
import BookingCard from 'features/booking/BookingCard';

export interface DraftsProps { }

const Drafts: FC<DraftsProps> = (props) => {
    const classes = useStyles();

    const { bookings = [] } = useSelector<ReduxStore, Pick<UserReducer, 'bookings'>>(({ User: { bookings } }) => ({ bookings: bookings?.filter(b => b.inDraft) }));

    return (
        <>
            <Header />
            <Container maxWidth={'lg'} >
                <Box my={5} ><Typography variant={'h1'} >Booking Draft</Typography></Box>
                <Grid container spacing={4} >
                    {
                        bookings.map((booking, index) => {
                            return (
                                <Grid key={index} item md={4} >
                                    <BookingCard booking={booking} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({

    }))
})

export default Drafts