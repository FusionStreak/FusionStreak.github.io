import React from "react";
import { Container, Typography, Box, Divider, List, ListItem, Chip, Card, CardActionArea, CardContent, ListItemText } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import Projects from "./Projects";
import Grid from "@mui/material/Unstable_Grid2";
import Icons from "./Icons";

const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

function Proj(info) {

    return (
        <Card key={info.name} sx={{ my: 2 }} onClick={() => { openInNewTab(info.url) }} elevation={5}>
            <CardActionArea>
                <CardContent>
                    <Grid container>
                        <Grid xs={6}>
                            <Typography variant="h6">{info.name} | {info.role}</Typography>
                        </Grid>
                        <Grid xs={6} textAlign={'right'}>
                            <Typography>{info.date.month} {info.date.year}</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="overline">{info.org}</Typography>
                    <Divider />
                    <Box sx={{ my: 2 }}>
                        {info.awards.map((award) => {
                            return <Chip key={award} icon={<EmojiEvents />} label={award} variant='outlined' sx={{ mr: 1, pl: 1 }} color="warning" />
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
                    <Divider />
                    <Box sx={{ my: 1 }}>
                        {info.skills.map((skill) => {
                            return (
                                <Chip icon={Icons[skill.toLowerCase()]} key={skill} label={skill} sx={{ mr: 1, pl: 1 }} color="primary" />
                            )
                        })}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default function Project(props) {

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Projects</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                {Projects.map((project) => {
                    return Proj(project)
                })}
            </Box>
        </Container>
    )
}