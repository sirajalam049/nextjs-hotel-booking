import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { IFormActionProps, ReactForm, FormConfig } from 'react-forms';
import * as Yup from 'yup';
import useAsyncTask from 'hooks/useAsyncTask';
import AuthService from 'models/auth';
import FormContainer from 'components/layout/FormContainer';
import { Box, Typography, Button } from '@material-ui/core';
import Link from 'next/link';
import Header from 'features/Header';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export interface LoginProps { }

const CONFIG: Array<Array<FormConfig> | FormConfig> = [
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

const useFormActionConfig = () => {
    const classes = useStyles();
    const config: IFormActionProps = {
        submitButtonText: 'Submit',
        submitButtonLayout: 'fullWidth',
        submitButtonProps: {
            size: 'large'
        },
        containerClassNames: classes.buttonContainer
    };
    return config;
}

const Login: FC<LoginProps> = (props) => {
    const classes = useStyles();
    const formActionConfig = useFormActionConfig();

    const signUpTask = useAsyncTask(AuthService.signUp);

    const handleSubmit = (data: { firstName: string, lastName: string, email: string, password: string }) => {
        signUpTask.run(data);
    }

    return (
        <>
            <Header />
            <FormContainer>
                <Box display='flex' justifyContent={'center'} mb={3} ><Typography variant={'h3'} >Sign Up</Typography></Box>
                <ReactForm formId="login-form"
                    config={CONFIG}
                    actionConfig={formActionConfig}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    formSettings={{
                        verticalSpacing: 36
                    }}
                    isInProgress={signUpTask.status === 'PROCESSING'}
                />
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
        buttonContainer: {
            marginTop: 10
        }
    }))
})

export default Login