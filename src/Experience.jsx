import React from "react";
import { Container, Typography, Box, Divider, List, ListItem, Chip, ListItemText, Card, CardContent } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import Experiences from "./Experiences";
import Icons from "./Icons";

/**
 * 
 * @param {Object} info - The experience object
 * @returns TimelineItem
 */
function ExpWide(info) {
    return (
        <TimelineItem key={info.role}>
            <TimelineOppositeContent color="textSecondary">
                <Typography variant="overline">{info.start.month} {info.start.year} - {info.end.month} {info.end.year}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            {info.role} | {info.company}
                        </Typography>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <List>
                                {info.notes.map((note) => {
                                    return (
                                        <ListItem key={note} sx={{ py: 0 }}>
                                            <ListItemText>
                                                {note}
                                            </ListItemText>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            {info.skills.map((skill) => {
                                return (
                                    <Chip icon={Icons[skill.toLowerCase()]} key={skill} label={skill} sx={{ mr: 1, pl: 1, mt: 1 }} color={"primary"} />
                                )
                            })}
                        </Box>
                    </CardContent>
                </Card>
            </TimelineContent>
        </TimelineItem>
    )
}

function ExpSmall(info) {
    return (
        <Card key={info.role} sx={{ my: 2 }} elevation={5}>
            <CardContent>
                <Grid container>
                    <Grid xs={12}>
                        <Typography variant="h6">{info.role}</Typography>
                    </Grid>
                    <Grid xs={12} >
                        <Typography variant='subtitle1'>{info.company}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="subtitle2">{info.start.month}, {info.start.year} - {info.end.month}, {info.end.year}</Typography>
                    </Grid>
                </Grid>
                <Typography variant="overline">{info.org}</Typography>
                <Divider />
                <Box sx={{ my: 2 }}>
                    <List>
                        {info.notes.map((note) => {
                            return (
                                <ListItem key={note} sx={{ py: 0 }}>
                                    <ListItemText>{note}</ListItemText>
                                </ListItem>)
                        })}
                    </List>
                </Box>
                <Box sx={{ my: 1 }}>
                    {info.skills.map((skill) => {
                        return (
                            <Chip icon={Icons[skill.toLowerCase()]} key={skill} label={skill} color="primary" />
                        )
                    })}
                </Box>
            </CardContent>
        </Card>
    )
}

export default function Experience(props) {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Experience</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.255,
                        },
                    }}
                >
                    {Experiences.map((exp) => {
                        return ExpWide(exp);
                    })}
                </Timeline>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }} my={2}>
                {Experiences.map((exp) => {
                    return ExpSmall(exp);
                })}
            </Box>
        </Container>
    )
}