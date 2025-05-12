import React from "react";
import { Typography, Box, Divider, List, ListItem, Chip, ListItemText, Card, CardContent } from "@mui/material";
import Grid from '@mui/material/Grid'
import { Icons } from '../icons'

export default function ExperienceMobile({ experiences }) {
    return (
        <Box sx={{ flexGrow: 1 }} my={2}>
            {experiences.map((info, idx) => {
                return (
                    <Card key={idx} sx={{ my: 2 }} elevation={5}>
                        <CardContent>
                            <Grid container>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6">{info.role}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12 }} >
                                    <Typography variant='subtitle1'>{info.company}</Typography>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="subtitle2">{info.start.month}, {info.start.year} - {info.end.month}, {info.end.year}</Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="overline">{info.org}</Typography>
                            <Divider />
                            <Box sx={{ my: 2 }}>
                                <List>
                                    {info.notes.map((note, idx) => {
                                        return (
                                            <ListItem key={idx} sx={{ py: 0 }}>
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
            })}
        </Box>
    )
}