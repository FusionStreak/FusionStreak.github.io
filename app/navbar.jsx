'use client'

import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button, Tooltip, Divider, Container } from "@mui/material";
import { SiMastodon } from 'react-icons/si'
import { GitHub, LinkedIn, Email, Download, Menu as MenuIcon } from '@mui/icons-material'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const logo = '/icon.png'

export default function NavBar(props) {

    const [anchorElNav, setAnchorElNav] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(false);
    };

    const pages = [
        { "route": "/", name: "About Me" },
        { "route": "/experience", "name": "Experience" },
        { "route": "/projects", "name": "Projects" },
    ]

    const pathname = usePathname()

    return (
        <React.Fragment>
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
                                {pages.map((page, idx) => (
                                    <MenuItem key={idx}>
                                        <Link href={page.route} passHref>
                                            <Typography textAlign="center">{page.name}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                                <Divider />
                                <IconButton
                                    size="small"
                                    aria-label="Mastodon"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    rel="me"
                                    href="https://fosstodon.org/@FusionStreak"
                                    target={'_blank'}
                                    color="inherit"
                                >
                                    <SiMastodon />
                                </IconButton>
                                <IconButton
                                    size="small"
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
                                    size="small"
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
                                    size="small"
                                    aria-label="E-mail"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="mailto://sayfullaheid@gmail.com"
                                    color="inherit"
                                >
                                    <Email />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    aria-label="Download resume"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="https://github.com/FusionStreak/FusionStreak.github.io/raw/main/public/SayfullahEid.pdf"
                                    download={'SayfullahEid.pdf'}
                                    color="inherit"
                                >
                                    <Download />
                                </IconButton>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    href={page.route}
                                    variant={page.route === pathname ? 'contained' : 'text'}
                                    sx={{ color: 'white' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title="Mastodon">
                                <IconButton
                                    size="small"
                                    aria-label="Mastodon"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    rel="me"
                                    href="https://fosstodon.org/@FusionStreak"
                                    target={'_blank'}
                                    color="inherit"
                                >
                                    <SiMastodon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="GitHub">
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
                            </Tooltip>
                            <Tooltip title="LinkedIn">
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
                            </Tooltip>
                            <Tooltip title="sayfullaheid@gmail.com">
                                <IconButton
                                    size="large"
                                    aria-label="E-mail"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    href="mailto://sayfullaheid@gmail.com"
                                    color="inherit"
                                >
                                    <Email />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Download My Resume">
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
                            </Tooltip>
                        </Box>
                        <Image src={logo} style={{ padding: "0.3rem" }} alt="logo" width={32} height={32} />
                        <Typography>Sayfullah Eid</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    )
}