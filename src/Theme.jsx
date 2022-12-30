import { createTheme } from '@mui/material/styles';
import { deepOrange, amber, grey } from '@mui/material/colors';

const myTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: deepOrange[500]
        },
        secondary: {
            main: '#22cbff'
        },
        error: {
            main: '#ff225d'
        },
        warning: {
            main: '#ffc422'
        },
        info: {
            main: '#cbff22'
        },
        success: {
            main: '#22ff56'
        },
        background: {
            paper: grey[900],
            default: '#122023'
        }
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    marginRight: '0.75rem', 
                    paddingLeft: '0.75rem', 
                    marginTop: '0.75rem'
                }
                ,
                iconMedium: {
                    width: '1.5rem',
                    height: '1.5rem',
                    color: 'inherit'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                overline: {
                    color: deepOrange[500]
                }
            }
        }
    }
});

export default myTheme;