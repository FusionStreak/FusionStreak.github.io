import { createTheme } from '@mui/material/styles';
import { deepOrange, amber, grey } from '@mui/material/colors';

const myTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: deepOrange[500]
        },
        background: {
            paper: grey[900]
        }
    },
    components: {
        MuiChip: {
            variants: [
                {
                    props: { variant: 'award' },
                    style: {
                        textTransform: 'none',
                        border: `2px solid ${amber[600]}`,
                        backgroundColor: 'transparent',
                        color: `${amber[600]}`
                    }
                },
            ],
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