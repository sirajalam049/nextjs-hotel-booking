import React, { FC } from 'react'
import { Box, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Hotel } from 'models/hotel/@types';
import HotelModel from 'models/hotel';
import Header from 'features/Header';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';

export interface HotelDetailsProps {
    hotel: Hotel;
}

const HotelDetails: FC<HotelDetailsProps> = (props) => {
    const classes = useStyles(props);
    const { hotel } = props;
    return (
        <>
            <Header />
            <div className={classes.coverContainer} >
            </div>
            <Container maxWidth={'lg'} >
                <Paper className={classes.paper} >
                    <Typography variant='h1' >{hotel.name}</Typography>
                    <Box mt={1} ml={2} >
                        <Box className={classes.infoContainer}>
                            <CallRoundedIcon fontSize={'small'} color={'secondary'} />
                            <Typography variant={'body2'} color={'textSecondary'} >{hotel.phone}</Typography>
                        </Box>
                        <Box className={classes.infoContainer}>
                            <LocationOnRoundedIcon color={'secondary'} fontSize='small' />
                            <Typography variant={'body2'} color={'textSecondary'} >{hotel.address}</Typography>
                        </Box>
                    </Box>
                    <Box mt={3} ><Typography color={'textSecondary'} >{hotel.about}</Typography></Box>
                </Paper>
            </Container>
        </>
    )
}

const useStyles = makeStyles<Theme, HotelDetailsProps>((theme) => {
    return (createStyles({
        coverContainer: {
            height: 340,
            width: '100%',
            background: ({ hotel }) => `url(${hotel.picture}) center no-repeat`,
        },
        paper: {
            width: 800,
            padding: 32,
            marginTop: '-64px'
        },
        infoContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
            '& p': {
                marginLeft: 4
            }
        }
    }))
});

export const getStaticProps: GetStaticProps<HotelDetailsProps, { id: string }> = async ({ params }) => {

    const id = params?.id;

    if (!id) throw "Id not found";

    const hotel = await HotelModel.getItem({ id });

    return {
        props: {
            hotel
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    const paths: string[] = (await HotelModel.getItemList({ params: { filter: { fields: ['id'] } } })).map(h => `/hotels/${h.id}`);

    return {
        paths,
        fallback: false
    }
}

export default HotelDetails