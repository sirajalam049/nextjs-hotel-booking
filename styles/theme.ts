import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles";

export const STATUS_COLOR: { [key: string]: string } = {
    Live: '#65C91C',
    Past: '#4D4D4D',
    Upcoming: '#8343E5',
    Archived: '#FF0000',
}

export default createMuiTheme({
    palette: {
        primary: {
            main: '#8343E5',
            light: fade('#8343E5', 0.2),
            contrastText: "#fff",
        },
        secondary: {
            main: '#65C91C',
            light: fade('#65C91C', 0.1),
            contrastText: "#fff"
        },
        grey: {
            100: '#262626',
            200: '#4D4D4D',
            300: '#808080',
            400: '#D9D9D9',
            500: '#474747',
            600: '#707070',
            700: '#E5E8F2',
            800: '#363535',
        },
        text: {
            primary: "#4D4D4D",
            secondary: "#707070"
        },
        background: {
            default: "#F5F5F5",
            paper: "#fff"
        },
        common: {
            black: '#000',
            white: '#fff'
        },
        action: {
            active: '#4D4D4D'
        },
        error: {
            main: '#B71840'
        },

    },
    typography: {
        fontFamily: 'lato',
        h1: {
            fontSize: 96
        },
        h2: {
            fontSize: 60
        },
        h3: {
            fontSize: 48
        },
        h4: {
            fontSize: 34
        },
        h5: {
            fontSize: 24
        },
        h6: {
            fontSize: 20
        },
        subtitle1: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        subtitle2: {
            fontSize: 14,
            fontWeight: 'bold'
        },
        body1: {
            fontSize: 16
        },
        body2: {
            fontSize: 14
        },
        caption: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        overline: {
            fontSize: 12,
            textTransform: 'unset'
        },

    },
    overrides: {
        MuiButton: {
            label: {
                fontWeight: 'bold',
                fontSize: 16,
            },
            outlined: {
                textTransform: 'capitalize'
            },
            text: {
                textTransform: 'capitalize'
            },
            sizeLarge: {
                height: 45
            },
        },
        MuiFab: {
            sizeSmall: {
                height: 36,
                width: 36,
                borderRadius: 18
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: "#707070"
            }
        },
        MuiSnackbar: {
            root: {
                zIndex: 1500
            }
        },
        MuiChip: {
            root: {
                height: 'auto',
                minHeight: '26px'
            }
        },
        MuiCheckbox: {
            root: {
                /**
                 * To horizontal align with other elements.
                 * PaddingLeft is 9 by default that make it shift right 
                 * by 9 pixels + pixel is the space between svg container and path of the checkbox, 
                 * so to align, just move it left bhy 9 + 3 = 12 pixels.
                 */
                // marginLeft: -12
                padding: 0,
            },

        },
        MuiTypography: {
            root: {
                whiteSpace: 'pre-wrap'
            }
        }
        // MuiInputBase: {
        //     input: {
        //         padding: 0
        //     }
        // }
    }
})