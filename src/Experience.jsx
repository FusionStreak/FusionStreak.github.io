import React from "react";
import { Container, Typography, Box, Divider, List, ListItem, Chip, ListItemText, Card, CardContent } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import Experiences from "./Experiences";

/**
 * 
 * @param {Object} info - The experience object
 * @returns TimelineItem
 */
function Exp(info) {
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
                    <Divider />
                    <Box sx={{ my: 2 }}>
                        {info.skills.map((skill) => {
                            return (
                                <Chip key={skill} label={skill} variant="outlined" sx={{ mr: 1 }}/>
                            )
                        })}
                    </Box>
                    </CardContent>
                </Card>
            </TimelineContent>
        </TimelineItem>
    )
}

export default function Experience(props) {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Experience</Typography>
            </Box>
            <Box>
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.4,
                        },
                    }}
                >
                    {Experiences.map((exp) => {
                        return Exp(exp);
                    })}
                </Timeline>
            </Box>
        </Container>
    )
}