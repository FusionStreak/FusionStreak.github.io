import React from "react";
import { Container, Typography, Box, Card, CardContent, Divider, Chip } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import CarletonLight from './CarletonLight.png'
import ACDark from './ACDark.png'
import ACLight from './ACLight.png'
import Grid from '@mui/material/Unstable_Grid2'
import Icons from "./Icons";

export default function About(props) {

    const skills = {
        'Languages': ["Python", "Java", "C/C++", "JavaScript"],
        'Tools & Frameworks': ["ReactJS", "NodeJS", "GraphQL", "ONgDB"],
        'IT': ["Cisco IOS", "Juniper", "RouterOS", "Windows Server"],
        'DevOps': ["Kubernetes", "Docker"]
    }

    return (
        <Container >
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">About Me</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                <Card elevation={5} sx={{ my: 2 }} >
                    <CardContent>
                        <Grid container>
                            <Grid xs={6}>
                                <Typography variant="h6">Bachelor of Information Technology</Typography>
                                <Typography variant="overline">Network Technology</Typography>
                            </Grid>
                            <Grid xs={6} textAlign='right'>
                                <img src={props.dark ? ACDark : ACLight} alt="Carleton University Logo" height={50} style={{ verticalAlign: 'top' }} />
                                <img src={props.dark ? CarletonDark : CarletonLight} alt="Carleton University Logo" height={75} />
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Typography><b>Courses:</b> DevOps, Advanced Network Routing, Network Security, Data Structures, Database Concepts and SQL</Typography>
                        <Typography><b>Expected Graduation:</b> May 2024</Typography>
                        <Typography><b>GPA:</b> 2.9 / 4.0</Typography>
                    </CardContent>
                </Card>
                <Card elevation={5} sx={{ my: 2 }} >
                    <CardContent>
                        <Typography variant="h6">Skills</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Grid container rowGap={1}>
                            {Object.keys(skills).map((skill) => {
                                return (
                                    <React.Fragment key={skill}>
                                        <Grid xs={2} sx={{my: 1}}>
                                            <b>{skill}:</b>
                                        </Grid>
                                        <Grid xs={10}>
                                            {skills[skill].map((s) => {
                                                return (
                                                    <Chip label={s} key={s} icon={Icons[s.toLowerCase()]} sx={{mr: 1, pl: 1}} color="primary"/>
                                                )
                                            })}
                                        </Grid>
                                    </React.Fragment>
                                )
                            })}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}