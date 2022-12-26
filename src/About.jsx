import React from "react";
import { Container, Typography, Box, Card, CardContent, Divider } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import CarletonLight from './CarletonLight.png'
import ACDark from './ACDark.png'
import ACLight from './ACLight.png'
import Grid from '@mui/material/Unstable_Grid2'

export default function About(props) {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">About Me</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid xs={6}>
                                <Typography variant="h6">Bachelor of Information Technology</Typography>
                                <Typography variant="overline">Network Technology</Typography>
                            </Grid>
                            <Grid xs={6} textAlign='right'>
                            <img src={props.dark ? ACDark : ACLight} alt="Carleton University Logo" height={50} style={{verticalAlign: 'top'}}/>
                                <img src={props.dark ? CarletonDark : CarletonLight} alt="Carleton University Logo" height={75}/>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Typography><b>Courses:</b> DevOps, Advanced Network Routing, Network Security, Data Structures, Database Concepts and SQL</Typography>
                        <Typography><b>Expected Graduation:</b> May 2024</Typography>
                        <Typography><b>GPA:</b> 2.9 / 4.0</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}