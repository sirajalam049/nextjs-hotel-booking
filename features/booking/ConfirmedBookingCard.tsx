import React, { FC } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Booking } from 'models/booking/@types';
import dayjs from 'dayjs';

export interface ConfirmedBookingCardProps {
    booking: Booking;
}

const ConfirmedBookingCard: FC<ConfirmedBookingCardProps> = (props) => {
    const classes = useStyles();

    const { booking } = props;

    if (!booking.hotel) return null;
    return (
        <div className={classes.root} >
            <Typography variant={'h5'} >{booking.hotel.name}</Typography>
            <Typography>Created on {dayjs(booking.created).format('MMM Do, YYYY')}</Typography>
            <Typography>{`${booking.numberOfRooms} room${booking.numberOfRooms === 1 ? '' : 's'} for ${booking.numberOfNights} night${booking.numberOfNights === 1 ? '' : 's'}`}</Typography>
            <Button disableElevation variant={'contained'} color={'primary'} >Go to hotel</Button>
        </div>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        root: {
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,.125)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            '& button': {
                alignSelf: 'flex-end'
            }
        }
    }))
})

export default ConfirmedBookingCard