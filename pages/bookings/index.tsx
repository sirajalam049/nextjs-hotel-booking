import { Container, Typography, Box, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Header from 'features/Header';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ReduxStore } from 'store';
import { UserReducer } from 'store/user';
import BookingCard from 'features/booking/BookingCard';
import withAuth from 'features/auth/withAuth';

export interface BookingsProps { }

const Bookings: FC<BookingsProps> = (props) => {
    const classes = useStyles();

    const { bookings = [] } = useSelector<ReduxStore, Pick<UserReducer, 'bookings'>>(({ User: { bookings } }) => ({ bookings: bookings?.filter(b => !b.inDraft) }));

    return (
        <>
            <Header />
            <Container maxWidth={'lg'} >
                <Box my={5} ><Typography variant={'h1'} >Your Confirmed Bookings</Typography></Box>
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

export default withAuth(Bookings);