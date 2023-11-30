'use client'

import Image from 'next/image'
import React from "react";
import { Container, Typography, Box, Button, Card, CardContent, Divider, Chip, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import ACDark from './ACDark.png'
import ReactBasicCertificate from './certifications/ReactBasicCertificate.svg'
import FrontendDeveloperReactCertificate from './certifications/FrontendDeveloperReactCertificate.svg'
import JavaBasicCertificate from './certifications/JavaBasicCertificate.svg'
import PythonBasicCertificate from './certifications/PythonBasicCertificate.svg'
import ProblemSolvingBasicCertificate from './certifications/ProblemSolvingBasicCertificate.svg'
import Grid from '@mui/material/Unstable_Grid2'
import Icons from "./icons";
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { ChevronRight, ExpandMore, HorizontalRule } from "@mui/icons-material";

function Education() {
  return (
    <Card elevation={5} sx={{ my: 2 }} >
      <CardContent>
        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid xs={6}>
            <Typography variant="h6">Bachelor of Information Technology</Typography>
            <Typography variant="overline">Network Technology</Typography>
          </Grid>
          <Grid xs={6} textAlign='right'>
            <Image src={CarletonDark} alt="Carleton University Logo" height={50} />
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
            <Image src={CarletonDark} alt="Carleton University Logo" height={50} />
          </Grid>
        </Grid>
        <Typography><b>Expected Graduation:</b> May 2024</Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid xs={6}>
            <Typography variant="h6">Advanced Diploma in Computer Engineering Technology</Typography>
            <Typography variant="overline">Network Technology</Typography>
          </Grid>
          <Grid xs={6} textAlign='right'>
            <Image src={ACDark} alt="Algonquin College Logo" height={50} />
          </Grid>
        </Grid>
        <Grid container sx={{ display: { xs: 'block', md: 'none' } }}>
          <Grid xs={12}>
            <Typography variant="h6">Advanced Diploma in Computer Engineering Technology</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="overline">Network Technology</Typography>
          </Grid>
          <Grid xs={12} >
            <Image src={ACDark} alt="Algonquin College Logo" height={50} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function Skills() {
  const skills = {
    'Languages': ["Python", "Java", "C/C++", "JavaScript", "PHP"],
    'Libraries': ["ReactJS", "NodeJS", "GraphQL", "Bootstrap", "Material UI", "Pandas"],
    'IT': ["Cisco IOS", "Juniper", "RouterOS", "Aruba", "Nokia"],
    "Server/DevOps": ["TrueNAS", "Ubuntu", "Windows Server", "Kubernetes", "Docker", "Git"],
    'Soft Skills': ["Agile Development", "Teamwork", "Communication", "Time Management"]
  }

  return (
    <Card elevation={5} sx={{ my: 2 }} >
      <CardContent>
        <Typography variant="h6">Skills</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
          {Object.keys(skills).map((skill, idx) => {
            return (
              <React.Fragment key={idx}>
                <Grid xs={3} sm={2} mt={2} display="flex" alignItems="center">
                  <b>{skill}:</b>
                </Grid>
                <Grid xs={3} sm={10} display="flex" alignItems="center">
                  {skills[skill].map((s, idx) => {
                    return (
                      <Chip label={s} key={idx} icon={Icons[s.toLowerCase()]} aria-label={s} color="primary" />
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
        >
          {Object.keys(skills).map((skill, idx) => {
            return (
              <TreeItem aria-label={skill} key={idx} nodeId={skill} label={skill}>
                {skills[skill].map((s, idx) => {
                  return (
                    <TreeItem aria-label={s} key={idx} nodeId={s} label={s} icon={Icons[s.toLowerCase()]} />
                  )
                })}
              </TreeItem>
            )
          })}
        </TreeView>
      </CardContent>
    </Card>
  )
}

function Certifications() {

  const certifications = [
    ReactBasicCertificate,
    FrontendDeveloperReactCertificate,
    JavaBasicCertificate,
    PythonBasicCertificate,
    ProblemSolvingBasicCertificate
  ]

  return (
    <Card elevation={5} sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">Certifications</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} justifyContent={"center"}>
          {certifications.map((cert, idx) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Image src={cert} height={250} alt='React (Basic) Certificate' />
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default function Home() {

  const [expanded, setExpanded] = React.useState([])

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Sayfullah Eid</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Education />
        <Skills />
        <Certifications />
        <Card elevation={5} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>About Me</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Hello world!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              My name is Sayfullah Eid, I am a 5th year B.IT Networking student at Carleton University and Algonquin College. I chose this program as it gives me both the theoretical knowldge and practical skills in many different IT subjects, such as; cybersecurity, DevOps, network management, web development, etc.
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
