import { MuiThemeProvider } from '@material-ui/core';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import theme from 'styles/theme';
import 'resources/globalStyles.css';
import { Head } from 'next/document';

export default function app(props: AppPropsType) {
    const { Component, pageProps } = props;

    return (
        <MuiThemeProvider theme={theme} >
            <Component {...pageProps} />
        </MuiThemeProvider>
    )
}