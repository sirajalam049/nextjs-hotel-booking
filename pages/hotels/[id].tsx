import React, { FC } from 'react'
import { Box, Typography, Container, Paper, TextFieldProps, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Hotel } from 'models/hotel/@types';
import HotelModel from 'models/hotel';
import Header from 'features/Header';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import { Formik } from 'formik';
import { IReactFormProps, MLFormContent } from 'react-forms';
import { DatePickerProps } from '@material-ui/pickers';

export interface HotelDetailsProps { hotel: Hotel; }

const formConfig: IReactFormProps['config'] = [
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

    const handleSubmit = () => {

    }

    return (
        <>
            <Header />
            <div className={classes.coverContainer} >
            </div>
            <Container maxWidth={'lg'} >
                <Box display={'flex'} alignItems={'flex-start'} >
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
                    <Paper className={classes.formContainer} >
                        <Typography variant={'h4'} gutterBottom >Book Now</Typography>
                        <Formik
                            initialValues={{}}
                            onSubmit={handleSubmit}
                        >
                            {
                                formikProps => {
                                    return (
                                        <>
                                            <MLFormContent
                                                formId={'booking-form'}
                                                schema={formConfig}
                                                formikProps={formikProps}
                                                settings={{ verticalSpacing: 24 }}
                                            />
                                            <Box display={'flex'} mt={3} >
                                                <Button color={'primary'} variant={'contained'} >Book Now</Button>
                                                <Box mx={0.5} />
                                                <Button color={'secondary'} variant={'contained'} >Safe To Draft</Button>
                                            </Box>
                                        </>
                                    )
                                }
                            }
                        </Formik>
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