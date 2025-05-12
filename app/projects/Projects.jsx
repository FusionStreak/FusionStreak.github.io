import React from "react";
import { Container, Typography, Box, Divider, List, ListItem, Chip, Card, CardContent, ListItemText, CardActions, Button, Tooltip } from "@mui/material";
import { EmojiEvents, ChevronRight } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Icons } from "../icons";

export default function Projects({ projects }) {

    return (
        <Box sx={{ my: 2 }}>
            {projects.map((info, idx) => {
                return (
                    <Card key={info.name} sx={{ my: 2 }} elevation={5}>
                        <CardContent sx={{ pb: 0 }}>
                            <Grid container>
                                <Grid size={{ xs: 6 }}>
                                    <Typography variant="h6">{info.name} | {info.role}</Typography>
                                </Grid>
                                <Grid size={{ xs: 6 }} textAlign={'right'}>
                                    {
                                        info.date ? <Typography>{info.date.month} {info.date.year}</Typography> : <Typography>{info.start.month} {info.start.year} - {info.end.month} {info.end.year}</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Typography variant="overline">{info.org}</Typography>

                            <Divider />

                            <Box>
                                {Object.keys(info.awards).map((award) => {
                                    return <Tooltip key={award} title={info.awards[award]} placement={"top-start"}><Chip key={award} icon={<EmojiEvents />} label={award} color="warning" variant="outlined" /></Tooltip>
                                })}
                                <List>
                                    {info.notes.map((note) => {
                                        return (
                                            <ListItem key={note} sx={{ py: 0 }}>
                                                <ListItemText>{note}</ListItemText>
                                            </ListItem>)
                                    })}
                                </List>
                            </Box>

                            <Box >
                                {info.skills.map((skill) => {
                                    return (
                                        <Chip icon={Icons[skill.toLowerCase()]} key={skill} label={skill} color="primary" />
                                    )
                                })}
                            </Box>

                        </CardContent>
                        {Object.keys(info.urls).length !== 0 ?
                            <CardActions sx={{ ml: 2 }}>
                                {Object.keys(info.urls).map((url) => {
                                    return (
                                        <Button
                                            key={url}
                                            size="small"
                                            startIcon={Icons[url.toLowerCase()]}
                                            endIcon={<ChevronRight />}
                                            color="secondary"
                                            variant="text"
                                            target={'_blank'}
                                            href={info.urls[url]}>
                                            {url}
                                        </Button>
                                    )
                                })}

                            </CardActions>
                            : null}
                    </Card>
                )
            })}
        </Box>
    )
}