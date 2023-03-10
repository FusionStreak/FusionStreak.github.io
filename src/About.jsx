import React from "react";
import { Container, Typography, Box, Button, Card, CardContent, Divider, Chip, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import ACDark from './ACDark.png'
import Grid from '@mui/material/Unstable_Grid2'
import Icons from "./Icons";
import { TreeItem, TreeView } from "@mui/lab";
import { ChevronRight, ExpandMore, HorizontalRule } from "@mui/icons-material";
export default function About(props) {

    const skills = {
        'Languages': ["Python", "Java", "C/C++", "JavaScript"],
        'Libraries': ["ReactJS", "NodeJS", "GraphQL", "Bootstrap", "Material UI", "Pandas"],
        'IT': ["Cisco IOS", "Juniper", "RouterOS", "Aruba", "Nokia"],
        "Server/DevOps": ["TrueNAS", "Ubuntu", "Windows Server", "Kubernetes", "Docker", "Git"],
        'Soft Skills': ["Agile Development", "Teamwork", "Communication", "Time Management"]
    }

    const [expanded, setExpanded] = React.useState([])

    return (
        <Container >
            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Sayfullah Eid</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                <Card elevation={5} sx={{ my: 2 }} >
                    <CardContent>
                        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Grid xs={6}>
                                <Typography variant="h6">Bachelor of Information Technology</Typography>
                                <Typography variant="overline">Network Technology</Typography>
                            </Grid>
                            <Grid xs={6} textAlign='right'>
                                <img src={ACDark} alt="Carleton University Logo" height={'40rem'} style={{ verticalAlign: 'top' }} />
                                <img src={CarletonDark} alt="Carleton University Logo" height={'50rem'} />
                            </Grid>

                        </Grid>
                        <Grid container sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Grid xs={12}>
                                <Typography variant="h6">Bachelor of Information Technology</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="overline" >Network Technology</Typography>
                            </Grid>
                            <Grid xs={12} >
                                <img src={ACDark} alt="Carleton University Logo" height={'40rem'} style={{ verticalAlign: 'top' }} />
                                <img src={CarletonDark} alt="Carleton University Logo" height={'50rem'} />
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Typography><b>Courses:</b></Typography>
                        <List>
                            <ListItem disableGutters>
                                <ListItemIcon sx={{ 'min-width': '12px' }}><HorizontalRule sx={{ 'maxWidth': '10px' }} /></ListItemIcon>
                                <ListItemText>Network routing, switching, and architecture</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{ 'min-width': '12px' }}><HorizontalRule sx={{ 'maxWidth': '10px' }} /></ListItemIcon>
                                <ListItemText>Embedded and real time systems</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon sx={{ 'min-width': '12px' }}><HorizontalRule sx={{ 'maxWidth': '10px' }} /></ListItemIcon>
                                <ListItemText>DevOps, data structures, database concepts, and web programming</ListItemText>
                            </ListItem>
                        </List>
                        <Typography><b>Expected Graduation:</b> May 2024</Typography>
                    </CardContent>
                </Card>
                <Card elevation={5} sx={{ my: 2 }} >
                    <CardContent>
                        <Typography variant="h6">Skills</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {Object.keys(skills).map((skill) => {
                                return (
                                    <React.Fragment key={skill}>
                                        <Grid xs={3} sm={2} mt={2} display="flex" alignItems="center">
                                            <b>{skill}:</b>
                                        </Grid>
                                        <Grid xs={3} sm={10} display="flex" alignItems="center">
                                            {skills[skill].map((s) => {
                                                return (
                                                    <Chip label={s} key={s} icon={Icons[s.toLowerCase()]} aria-label={s} color="primary" />
                                                )
                                            })}
                                        </Grid>
                                    </React.Fragment>
                                )
                            })}
                        </Grid>
                        <TreeView
                            defaultCollapseIcon={<ExpandMore />}
                            defaultExpandIcon={<ChevronRight />}
                            sx={{
                                height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto',
                                display: { xs: 'block', md: 'none' }
                            }}
                            disableSelection
                            expanded={expanded}>
                            {Object.keys(skills).map((skill) => {
                                return (
                                    <TreeItem aria-label={skill} key={skill} nodeId={skill} label={skill} onClick={(e) => { setExpanded([skill]) }}>
                                        {skills[skill].map((s) => {
                                            return (
                                                <TreeItem aria-label={s} key={s} nodeId={s} label={s} icon={Icons[s.toLowerCase()]} />
                                            )
                                        })}
                                    </TreeItem>
                                )
                            })}
                        </TreeView>
                    </CardContent>
                </Card>
                <Card elevation={5} sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant='h6' sx={{ mb: 2 }}>About Me</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Hello world!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            My name is Sayfullah Eid, I am a 3rd year B.IT Networking student at Carleton University and Algonquin College. I chose this program as it gives me both the theoretical knowldge and practical skills in many different IT subjects, such as; cybersecurity, DevOps, network management, web development, etc.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            My tech journey began when I started a <Button variant='text' sx={{ px: 0, height: '22px' }} color="secondary" href="https://wro-association.org/">World Robotics Olympiad</Button> team at my middle school. From there I took a series of online crash courses in programming and database concepts.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            I took those skills and joined a <Button variant="text" sx={{ px: 0, height: '22px' }} color="secondary" href="https://www.firstroboticscanada.org/frc/">FIRST Robotics Competition</Button> (FRC) team in high school. Working in these teams also sparked my interest in STEM(Science, Technology, Engineering & Math) education. I started mentoring robotics teams after I graduated.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            My experience in FRC drove me towards community driven development, and I began my journey with <Button variant="text" sx={{ px: 0, height: '22px' }} color="secondary" href="https://en.wikipedia.org/wiki/Free_and_open-source_software">Free and Open Source Software</Button> (FOSS). I am now a strong advocate for open source projects, be it hardware or software. Especially in education.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            In my off time, you will find me taking road trips, going on hikes, researching sustainable technologies, woodworking, and playing PC games.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}