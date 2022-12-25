import React from "react";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Box, Container, Fab, Fade, Typography, Menu, MenuItem, IconButton, Button, FormControlLabel, FormGroup, Switch } from '@mui/material'
import { KeyboardArrowUp, Menu as MenuIcon, GitHub, LinkedIn } from '@mui/icons-material';
import logo from './logo.png'
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function NavBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [page, setPage] = React.useState('about')
    const [dark, setDark] = React.useState(true)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSwitchPage = (p) => {
        setPage(p);
    }

    const handleDark = () => {
        setDark(!dark)
    }

    const renderPage = () => {
        switch (page) {
            case 'about':
                return (<About />)
            case 'project':
                return (<Projects />)
            case 'experience':
                return (<Experience />)
            default:
                return (<About />)
        }
    }

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const pages = {
        "about": "About Me",
        "project": "Projects",
        "experience": "Experience"
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <CssBaseline />
                <AppBar>
                    <Container>
                        <Toolbar disableGutters>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {Object.keys(pages).map((page) => (
                                        <MenuItem key={page} onClick={() => { handleSwitchPage(page) }}>
                                            <Typography textAlign="center">{pages[page]}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {Object.keys(pages).map((p) => (
                                    <Button
                                        key={p}
                                        onClick={() => { handleSwitchPage(p) }}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                        variant={page === p ? 'contained' : 'text'}
                                    >
                                        {pages[p]}
                                    </Button>
                                ))}
                            </Box>
                            <Box>
                                <IconButton
                                    size="large"
                                    aria-label="GitHub"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={() => { openInNewTab("https://github.com/FusionStreak") }}
                                    color="inherit"
                                >
                                    <GitHub />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="LinkedIn"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={() => { openInNewTab("https://www.linkedin.com/in/sayfullah-eid/") }}
                                    color="inherit"
                                >
                                    <LinkedIn />
                                </IconButton>
                            </Box>
                            <FormGroup>
                                <FormControlLabel
                                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={handleDark} />}
                                />
                            </FormGroup>
                            <img src={logo} style={{ padding: "0.3rem" }} alt="logo" width={32} height={32} />
                            <Typography>Sayfullah Eid</Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                {renderPage()}
                <ScrollTop {...props}>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUp />
                    </Fab>
                </ScrollTop>
            </ThemeProvider>
        </React.Fragment>
    )
}