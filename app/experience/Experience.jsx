import React from "react";
import { Typography, Box, Divider, List, ListItem, Chip, ListItemText, Card, CardContent } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { Icons } from '../icons'

export default function Experience({ experiences }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.255,
                    },
                }}
            >
                {experiences.map((info, idx) => {
                    return (
                        <TimelineItem key={idx}>
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
                                                {info.notes.map((note, idx) => {
                                                    return (
                                                        <ListItem key={idx} sx={{ py: 0 }}>
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
                })}
            </Timeline>
        </Box>
    )
}