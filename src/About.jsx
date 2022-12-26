import React from "react";
import { Container, Typography, Box, Card, CardContent, Divider, Chip } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import ACDark from './ACDark.png'
import Grid from '@mui/material/Unstable_Grid2'
import Icons from "./Icons";

export default function About(props) {

    const skills = {
        'Languages': ["Python", "Java", "C/C++", "JavaScript"],
        'Tools & Frameworks': ["ReactJS", "NodeJS", "GraphQL", "ONgDB", "Git"],
        'IT': ["Cisco IOS", "Juniper", "RouterOS", "Windows Server"],
        'DevOps': ["Kubernetes", "Docker"],
        'Soft Skills': ["Agile Development", "Teamwork", "Communication", "Time Management"]
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
                                <img src={ ACDark } alt="Carleton University Logo" height={50} style={{ verticalAlign: 'top' }} />
                                <img src={ CarletonDark } alt="Carleton University Logo" height={75} />
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
                        <Grid container >
                            {Object.keys(skills).map((skill) => {
                                return (
                                    <React.Fragment key={skill}>
                                        <Grid xs={3} sm={2} mt={1} >
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
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}