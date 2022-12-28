import React from "react";
import { Container, Typography, Box, Card, CardContent, Divider, Chip, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import ACDark from './ACDark.png'
import Grid from '@mui/material/Unstable_Grid2'
import Icons from "./Icons";
import { TreeItem, TreeView } from "@mui/lab";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { GiHand, GiTreeGrowth, GiLightBulb } from "react-icons/gi"

export default function About(props) {

    const skills = {
        'Languages': ["Python", "Java", "C/C++", "JavaScript"],
        'Tools & Frameworks': ["ReactJS", "NodeJS", "GraphQL", "ONgDB", "Git"],
        'IT': ["Cisco IOS", "Juniper", "RouterOS", "Aruba"],
        'DevOps': ["Kubernetes", "Docker"],
        "Server": ["TrueNAS", "RaspberryPi", "Ubuntu", "Windows Server", "Linux"],
        "Security": ["Kali"],
        'Soft Skills': ["Agile Development", "Teamwork", "Communication", "Time Management"]
    }

    return (
        <Container >
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Sayfullah Eid</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                <Card elevation={5} sx={{ my: 2 }} >
                    <CardContent>
                        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Grid xs={6}>
                                <Typography variant="h6">Bachelor of Information Technology</Typography>
                                <Typography variant="overline">Network Technology</Typography>
                            </Grid>
                            <Grid xs={6} textAlign='right'>
                                <img src={ACDark} alt="Carleton University Logo" height={'40rem'} style={{ verticalAlign: 'top' }} />
                                <img src={CarletonDark} alt="Carleton University Logo" height={'50rem'} />
                            </Grid>

                        </Grid>
                        <Grid container sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Grid xs={12}>
                                <Typography variant="h6">Bachelor of Information Technology</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="overline" >Network Technology</Typography>
                            </Grid>
                            <Grid xs={12} >
                                <img src={ACDark} alt="Carleton University Logo" height={'40rem'} style={{ verticalAlign: 'top' }} />
                                <img src={CarletonDark} alt="Carleton University Logo" height={'50rem'} />
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Typography><b>Courses:</b> DevOps, Advanced Network Routing, Network Security, Data Structures, Database Concepts and SQL</Typography>
                        <Typography><b>Expected Graduation:</b> May 2024</Typography>
                    </CardContent>
                </Card>
                <Card elevation={5} sx={{ my: 2 }} >
                    <CardContent>
                        <Typography variant="h6">Skills</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {Object.keys(skills).map((skill) => {
                                return (
                                    <React.Fragment key={skill}>
                                        <Grid xs={3} sm={2} mt={2} >
                                            <b>{skill}:</b>
                                        </Grid>
                                        <Grid xs={3} sm={10}>
                                            {skills[skill].map((s) => {
                                                return (
                                                    <Chip label={s} key={s} icon={Icons[s.toLowerCase()]} color="primary" />
                                                )
                                            })}
                                        </Grid>
                                    </React.Fragment>
                                )
                            })}
                        </Grid>
                        <TreeView
                            defaultCollapseIcon={<ExpandMore />}
                            defaultExpandIcon={<ChevronRight />}
                            sx={{
                                height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto',
                                display: { xs: 'block', md: 'none' }
                            }}>
                            {Object.keys(skills).map((skill) => {
                                return (
                                    <TreeItem aria-label={skill} key={skill} nodeId={skill} label={skill} >
                                        {skills[skill].map((s) => {
                                            return (
                                                <TreeItem aria-label={s} key={s} nodeId={s} label={s} icon={Icons[s.toLowerCase()]} />
                                            )
                                        })}
                                    </TreeItem>
                                )
                            })}
                        </TreeView>
                    </CardContent>
                </Card>
                <Card elevation={5} sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="h6">About Me</Typography>
                        <Divider sx={{ my: 2 }} />
                        <List dense={true}>
                            <ListItem>
                                <ListItemIcon>
                                    <GiHand />
                                </ListItemIcon>
                                <ListItemText primary="Hi, I'm Sayfullah Eid" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <GiLightBulb />
                                </ListItemIcon>
                                <ListItemText primary="I'm interested in open source and sustainable tech" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <GiTreeGrowth />
                                </ListItemIcon>
                                <ListItemText primary="I'm currently learning JS" />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}