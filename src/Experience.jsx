import React from "react";
import { Container, Typography, Box, Paper, Divider, List, ListItem, Chip, ListItemText } from "@mui/material";
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
                {info.start.month} {info.start.year} - {info.end.month} {info.end.year}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper>
                    <Typography>
                        {info.role} | {info.company}
                    </Typography>
                    <Divider />
                    <List>
                        {info.notes.map((note) => {
                            return (
                                <ListItem key={note}>
                                    <ListItemText>
                                        {note}
                                    </ListItemText>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Divider />
                    <Box>
                        {info.skills.map((skill) => {
                            return (
                                <Chip key={skill} label={skill} variant="outlined" />
                            )
                        })}
                    </Box>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}

export default function Experience(props) {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography>Exp</Typography>
            </Box>
            <Box>
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
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