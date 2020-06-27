import React, { FC, useEffect, useState } from 'react'
import { Typography, Container, Paper, TextFieldProps, Button, CircularProgress, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Hotel } from 'models/hotel/@types';
import HotelModel from 'models/hotel';
import Header from 'features/Header';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import { Formik, FormikProps } from 'formik';
import { DatePickerProps, DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStore } from 'store';
import { UserReducer } from 'store/user';
import BookingModel from 'models/booking/mode';
import UserModel from 'models/user';
import { Booking } from 'models/booking/@types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from 'models/user/@types';
import useAsyncTask from 'hooks/useAsyncTask';
import dayjs from 'dayjs';
import Head from 'next/head';

export interface HotelDetailsProps { hotel: Hotel; }

const formConfig: { type: 'date-picker' | 'text', valueKey: keyof Booking, fieldProps: Record<string, any> }[] = [
    {
        type: 'date-picker',
        valueKey: 'date',
        fieldProps: {
            label: "Date",
            disableToolbar: true,
            autoOk: true,
            fullWidth: true
        } as DatePickerProps
    },
    {
        type: 'text',
        valueKey: 'numberOfNights',
        fieldProps: {
            label: 'Number of nights',
            fullWidth: true,
            type: 'number'
        } as TextFieldProps
    },
    {
        type: 'text',
        valueKey: "numberOfRooms",
        fieldProps: {
            label: 'Number of Rooms',
            fullWidth: true,
            type: 'number'
        }
    }
]

const HotelDetails: FC<HotelDetailsProps> = (props) => {
    const classes = useStyles(props);
    const { hotel } = props;
    const { user } = useSelector<ReduxStore, Pick<UserReducer, 'user'>>(({ User: { user } }) => ({ user }));

    const dispatch = useDispatch();

    const [draftBooking, setDraftBooking] = useState<Partial<Booking>>();

    const createBookingTask = useAsyncTask(BookingModel.createBooking);
    const saveToDraftTask = useAsyncTask(BookingModel.saveToDraft);
    const getUserCurrentHotelBookingDraftTask = useAsyncTask(UserModel.getUserCurrentHotelBookingDraft);

    const router = useRouter();

    const handleBook = async (formikProps: FormikProps<Partial<Booking>>) => {
        const createdBooking = await createBookingTask.run({ ...formikProps.values, userId: user?.id, hotelId: hotel.id }).catch(err => { });
        if (createdBooking) {
            dispatch({ type: "PUT_BOOKING", data: { ...createdBooking, hotel } });
            setDraftBooking(createdBooking)
        }
    }

    const handleSave = async (formikProps: FormikProps<Partial<Booking>>) => {
        const createdBooking = await saveToDraftTask.run({ ...formikProps.values, userId: user?.id, hotelId: hotel.id }).catch(err => { });
        if (createdBooking) {
            dispatch({ type: "PUT_BOOKING", data: { ...createdBooking, hotel } });
            setDraftBooking(createdBooking)
        }
    }


    const getDraftBooking = async (user: User) => {
        const booking = await getUserCurrentHotelBookingDraftTask.run({ userId: user.id, hotelId: hotel.id });
        setDraftBooking(booking);
    }

    useEffect(() => {
        if (user?.id) {
            getDraftBooking(user);
        }
    }, [user]);



    const loading = createBookingTask.status === 'PROCESSING' || saveToDraftTask.status === 'PROCESSING'

    return (
        <>
            <Head>
                <title>{hotel.name}</title>
                <meta name="description" content={hotel.about} />
                <meta name="og:title" content={hotel.name} />
                <meta name="og:description" content={hotel.about} />
                <meta name="og:url" content={router.route} />
                <meta name="og:image" content={hotel.thumbnail} />
                <meta name="og:type" content="article" />
                <meta property="article:author" content="Siraj Alam" />
                <meta property="keywords" content="reactjs, javascript, foss, open-source, date-library, dayjs, momentJS" />
                <meta property="article:published_time" content={hotel.created} />
                <meta property="article:modified_time" content={hotel.updated} />
                <meta property="og:locale" content="en_US" />
            </Head>
            <Header />
            <div className={classes.coverContainer} >
            </div>
            <Container maxWidth={'lg'} >
                <Box display={'flex'} alignItems={'flex-start'} >
                    <Paper className={classes.paper}>
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
                    <Paper className={classes.formContainer} >
                        <Typography variant={'h4'} gutterBottom >Book Now</Typography>
                        {
                            getUserCurrentHotelBookingDraftTask.status === 'PROCESSING' ? <CircularProgress /> :
                                user ?
                                    (
                                        (!draftBooking || draftBooking?.inDraft) ?
                                            <Formik<Partial<Booking>>
                                                initialValues={draftBooking || {}}
                                                onSubmit={() => { }}
                                                enableReinitialize={true}
                                            >
                                                {
                                                    formikProps => {

                                                        const handleDateChange = (date: any | null, name: keyof Booking) => {
                                                            if (!date) {
                                                                formikProps.setFieldValue(name, date, false);
                                                                return;
                                                            }
                                                            const dateValue = date.format('MM/DD/YYYY');
                                                            formikProps.setFieldValue(name, dateValue, false);
                                                        };

                                                        return (
                                                            <div className={classes.form} >
                                                                {
                                                                    formConfig.map((c) => {
                                                                        if (c.type === 'date-picker') {
                                                                            return (
                                                                                <KeyboardDatePicker
                                                                                    name={c.valueKey}
                                                                                    value={formikProps.values[c.valueKey] as string}
                                                                                    onChange={date => handleDateChange(date, c.valueKey)}
                                                                                    error={!!formikProps.errors[c.valueKey]}
                                                                                    helperText={formikProps.errors[c.valueKey]}
                                                                                    {...c.fieldProps}
                                                                                />
                                                                            )
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <TextField
                                                                                    name={c.valueKey}
                                                                                    value={formikProps.values[c.valueKey] as string}
                                                                                    onChange={formikProps.handleChange}
                                                                                    error={!!formikProps.errors[c.valueKey]}
                                                                                    helperText={formikProps.errors[c.valueKey]}
                                                                                    {...c.fieldProps}
                                                                                />
                                                                            )
                                                                        }
                                                                    })
                                                                }

                                                                <Box display={'flex'} mt={3} >
                                                                    <Button color={'primary'} variant={'contained'} onClick={() => handleBook(formikProps)} disabled={loading} >Book Now</Button>
                                                                    <Box mx={0.5} />
                                                                    <Button color={'secondary'} variant={'contained'} onClick={() => handleSave(formikProps)} disabled={loading} >Safe To Draft</Button>
                                                                </Box>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            </Formik>
                                            : <Box mt={2} ><Typography>{`Your check in date is ${dayjs(draftBooking.date, 'DD-MM-YYYY')}`}</Typography></Box>
                                    )
                                    : <Typography>
                                        <Link href={{ pathname: '/auth/login', query: { url: router.pathname, asUrl: router.asPath } }} >
                                            <a>Login</a>
                                        </Link> or
                                    <Link href={{ pathname: '/auth/signup', query: { url: router.pathname, asUrl: router.asPath } }} >
                                            <a> Sign Up </a>
                                        </Link>
                                    for make a hotel booking.
                                </Typography>
                        }
                    </Paper>
                </Box>
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
        },
        formContainer: {
            marginLeft: 50,
            marginTop: 50,
            position: 'sticky',
            padding: 24,
            width: 400
        },
        form: {
            '& > div': {
                marginBottom: 24
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