import { Box, Button, TextField, Typography, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormContainer from 'components/layout/FormContainer';
import withNoAuth from 'features/auth/withNoAuth';
import Header from 'features/Header';
import { Formik } from 'formik';
import useAsyncTask from 'hooks/useAsyncTask';
import AuthService from 'models/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Head from 'next/head';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export interface LoginProps { }



const Login: FC<LoginProps> = (props) => {
    const classes = useStyles();

    const router = useRouter();

    const dispatch = useDispatch();

    const loginTask = useAsyncTask(AuthService.login);

    const handleSubmit = async (data: { email: string, password: string }) => {
        const profile = await loginTask.run(data).catch(err => { throw err });
        dispatch({ type: "USER_RECEIVED", data: profile });
        router.push(router.query.url as string || '/', router.query.asUrl as string);
    }

    return (
        <>
            <Head>
                <title>Login - NextJS</title>
                <meta name="description" content={"Login in Hotel Booking application on nextJS"} />
                <meta name="og:title" content="Login - NextJS" />
                <meta name="og:description" content={"Login in Hotel Booking application on nextJS"} />
                <meta name="og:url" content={router.pathname} />
                <meta name="og:image" content={"https://i.ytimg.com/vi/Fnw3lNeH-XI/maxresdefault.jpg"} />
                <meta name="og:type" content="article" />
                <meta property="article:author" content="Siraj Alam" />
                <meta property="keywords" content="reactjs, javascript, foss, open-source, date-library, dayjs, momentJS" ></meta>
                <meta property="og:locale" content="en_US" />
            </Head>
            <Header />
            <FormContainer>
                <Box display='flex' justifyContent={'center'} mb={3} ><Typography variant={'h3'} >Login</Typography></Box>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        formikProps => (
                            <div className={classes.form} >
                                <TextField
                                    name={'email'}
                                    label={'Email'}
                                    value={formikProps.values.email}
                                    onChange={formikProps.handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name={'password'}
                                    label={'Password'}
                                    value={formikProps.values.password}
                                    onChange={formikProps.handleChange}
                                    type={'password'}
                                    fullWidth
                                />
                                <Button onClick={formikProps.submitForm} disabled={loginTask.status === 'PROCESSING'} variant={'contained'} color={'primary'} disableElevation fullWidth>
                                    {loginTask.status === 'PROCESSING' ? <CircularProgress size={24} /> : 'SUBMIT'}
                                </Button>
                            </div>
                        )
                    }
                </Formik>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1.5} >
                    <Typography variant={'caption'} >Not registered?</Typography>
                    <Link href={'/auth/signup'} >
                        <a><Button disableElevation size={'small'} color={'primary'} >SIGN UP</Button></a>
                    </Link>
                </Box>
            </FormContainer>
        </>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        form: {
            '& > div': {
                marginBottom: 36
            }
        },
        buttonContainer: {
            marginTop: 10
        }
    }))
})

export default withNoAuth(Login);