import { MuiThemeProvider } from '@material-ui/core';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import theme from 'styles/theme';
import 'resources/globalStyles.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from 'store';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

const rxStore = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default function app(props: AppPropsType) {
    const { Component, pageProps } = props;

    return (
        <MuiThemeProvider theme={theme} >
            <Provider store={rxStore} >
                <MuiPickersUtilsProvider utils={DayjsUtils} >
                    <Component {...pageProps} />
                </MuiPickersUtilsProvider>
            </Provider>
        </MuiThemeProvider>
    )
}