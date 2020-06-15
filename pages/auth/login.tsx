import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormContainer from 'components/layout/FormContainer';
import useAsyncTask from 'hooks/useAsyncTask';
import AuthService from 'models/auth';
import React, { FC } from 'react';
import { FormConfig, IFormActionProps, ReactForm } from 'react-forms';
import * as Yup from 'yup';
import { Box, Typography, Button } from '@material-ui/core';
import Link from 'next/link';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export interface LoginProps { }

const CONFIG: Array<Array<FormConfig> | FormConfig> = [{
    type: 'text',
    valueKey: 'email',
    fieldProps: {
        label: 'Email',
        fullWidth: true
    }
}, {
    type: 'password',
    valueKey: 'password',
    fieldProps: {
        label: 'Password',
        fullWidth: true
    }
}];

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

    const loginTask = useAsyncTask(AuthService.login);

    const handleSubmit = (data: { email: string, password: string }) => {
        loginTask.run(data);
    }

    return (
        <FormContainer>
            <ReactForm formId="login-form"
                config={CONFIG}
                actionConfig={formActionConfig}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                formSettings={{
                    verticalSpacing: 36,
                }}
                isInProgress={loginTask.status === 'PROCESSING'}
            />
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1.5} >
                <Typography variant={'caption'} >Not registered?</Typography>
                <Link href={'/auth/signup'} >
                    <a><Button disableElevation size={'small'} color={'primary'} >SIGN UP</Button></a>
                </Link>
            </Box>
        </FormContainer>
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