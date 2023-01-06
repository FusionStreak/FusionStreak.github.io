import React from "react";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Box, Container, Fab, Fade, Typography, Menu, MenuItem, IconButton, Button } from '@mui/material'
import { KeyboardArrowUp, Menu as MenuIcon, GitHub, LinkedIn, Email, Download } from '@mui/icons-material';
import logo from './logo.png'
import About from "./About";
import Project from "./Project";
import Experience from "./Experience";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "./Theme";

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
    const [anchorElNav, setAnchorElNav] = React.useState(false);
    const [page, setPage] = React.useState('about')

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(false);
    };

    const handleSwitchPage = (p) => {
        setPage(p);
    }

    const renderPage = () => {
        switch (page) {
            case 'about':
                return (<About />)
            case 'project':
                return (<Project />)
            case 'experience':
                return (<Experience />)
            default:
                return (<About />)
        }
    }

    const pages = {
        "about": "About Me",
        "experience": "Experience",
        "project": "Projects",
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={myTheme}>
                <CssBaseline />
                <AppBar enableColorOnDark>
                    <Container >
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
                                        variant={page === p ? 'contained' : 'text'}
                                        sx={{color: 'white'}}
                                    >
                                        {pages[p]}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="GitHub"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="https://github.com/FusionStreak"
                                    target={'_blank'}
                                    color="inherit"
                                >
                                    <GitHub />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="LinkedIn"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="https://www.linkedin.com/in/sayfullah-eid/"
                                    target='_blank'
                                    color="inherit"
                                >
                                    <LinkedIn />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="E-mail"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="mailto://sayfullaheid@gmail.com"
                                    target='_blank'
                                    color="inherit"
                                >
                                    <Email />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="Download resume"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="https://github.com/FusionStreak/FusionStreak.github.io/raw/main/public/SayfullahEid.pdf"
                                    download={'SayfullahEid.pdf'}
                                    color="inherit"
                                >
                                    <Download />
                                </IconButton>
                            </Box>
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