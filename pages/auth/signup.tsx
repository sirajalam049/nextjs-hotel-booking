import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import * as Yup from 'yup';
import useAsyncTask from 'hooks/useAsyncTask';
import AuthService from 'models/auth';
import FormContainer from 'components/layout/FormContainer';
import { Box, Typography, Button, TextField, TextFieldProps, CircularProgress } from '@material-ui/core';
import Link from 'next/link';
import Header from 'features/Header';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import withNoAuth from 'features/auth/withNoAuth';
import { Formik } from 'formik';
import Head from 'next/head';

interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const validationSchema = Yup.object<SignUpForm>({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export interface SignUpProps { }

const CONFIG: { type: string, valueKey: keyof SignUpForm, fieldProps: TextFieldProps }[] = [
    {
        type: 'text',
        valueKey: 'firstName',
        fieldProps: {
            label: 'First Name',
            fullWidth: true
        }
    },
    {
        type: 'text',
        valueKey: 'lastName',
        fieldProps: {
            label: 'Last Name',
            fullWidth: true
        }
    },
    {
        type: 'text',
        valueKey: 'email',
        fieldProps: {
            label: 'Email',
            fullWidth: true
        }
    },
    {
        type: 'password',
        valueKey: 'password',
        fieldProps: {
            label: 'Password',
            fullWidth: true
        }
    }
];

const SignUp: FC<SignUpProps> = (props) => {

    const classes = useStyles();

    const signUpTask = useAsyncTask(AuthService.signUp);

    const router = useRouter();

    const dispatch = useDispatch();

    const handleSubmit = async (data: { firstName: string, lastName: string, email: string, password: string }) => {
        const profile = await signUpTask.run(data);
        dispatch({ type: "USER_RECEIVED", data: profile });
        router.push(router.query.url as string || '/', router.query.asUrl as string);
    }

    return (
        <>
            <Head>
                <title>Sign Up - NextJS</title>
                <meta name="description" content={"Sign Up in Hotel Booking application on nextJS"} />
                <meta name="og:title" content="Sign Up - NextJS" />
                <meta name="og:description" content={"Sign Up in Hotel Booking application on nextJS"} />
                <meta name="og:url" content={router.pathname} />
                <meta name="og:image" content={"https://i.ytimg.com/vi/Fnw3lNeH-XI/maxresdefault.jpg"} />
                <meta name="og:type" content="article" />
                <meta property="article:author" content="Siraj Alam" />
                <meta property="keywords" content="reactjs, javascript, foss, open-source, date-library, dayjs, momentJS" ></meta>
                <meta property="og:locale" content="en_US" />
            </Head>
            <Header />
            <FormContainer>
                <Box display='flex' justifyContent={'center'} mb={3} ><Typography variant={'h3'} >Sign Up</Typography></Box>
                <Formik<SignUpForm>
                    initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        formikProps => (
                            <div className={classes.form} >
                                {
                                    CONFIG.map((c) => {
                                        return (
                                            <TextField
                                                type={c.type}
                                                name={c.valueKey}
                                                value={formikProps.values[c.valueKey]}
                                                onChange={formikProps.handleChange}
                                                error={!!formikProps.errors[c.valueKey]}
                                                helperText={formikProps.errors[c.valueKey]}
                                                {...c.fieldProps}
                                            />
                                        )
                                    })
                                }
                                <Button onClick={formikProps.submitForm} disabled={signUpTask.status === 'PROCESSING'} variant={'contained'} color={'primary'} disableElevation fullWidth>
                                    {signUpTask.status === 'PROCESSING' ? <CircularProgress size={24} /> : 'SUBMIT'}
                                </Button>
                            </div>
                        )
                    }
                </Formik>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1.5} >
                    <Typography variant={'caption'} >Already registered?</Typography>
                    <Link href={'/auth/login'} >
                        <a><Button disableElevation size={'small'} color={'primary'}>LOGIN</Button></a>
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

export default withNoAuth(SignUp);