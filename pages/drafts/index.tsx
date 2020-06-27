import { Box, Container, Grid, Typography } from '@material-ui/core';
import Meta from 'components/Meta';
import withAuth from 'features/auth/withAuth';
import BookingCard from 'features/booking/BookingCard';
import Header from 'features/Header';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ReduxStore } from 'store';
import { UserReducer } from 'store/user';

export interface DraftsProps { }

const Drafts: FC<DraftsProps> = (props) => {

    const { bookings = [] } = useSelector<ReduxStore, Pick<UserReducer, 'bookings'>>(({ User: { bookings } }) => ({ bookings: bookings?.filter(b => b.inDraft) }));

    return (
        <>
            <Meta
                title={'Drafts'}
                description={'List of incomplete bookings are saved in the drafts, they will appear here.'}
            />
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

export default withAuth(Drafts)