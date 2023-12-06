'use client'

import Image from 'next/image'
import React from "react";
import { Container, Typography, Box, Button, Card, CardContent, Divider, Chip } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import ACDark from './ACDark.png'
import Grid from '@mui/material/Unstable_Grid2'
import { Icons } from "./icons";

function Carleton() {
  return (
    <Card elevation={5} sx={{ my: 2 }} >
      <CardContent>
        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid xs={6}>
            <Typography variant="h6">Bachelor of Information Technology</Typography>
            <Typography variant="overline">Network Technology</Typography>
          </Grid>
          <Grid xs={6} textAlign='right'>
            <Image src={CarletonDark} alt="Carleton University Logo" height={100} style={{ marginTop: '19px', marginBottom: '20px' }} />
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
        <Typography><b>Expected Graduation:</b> April 2024</Typography>
      </CardContent>
    </Card>
  )
}

function Algonquin() {
  return (
    <Card elevation={5} sx={{ my: 2 }} >
      <CardContent>
        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid xs={6}>
            <Typography variant="h6">Advanced Diploma in Computer Engineering Technology</Typography>
            <Typography variant="overline">Network Technology</Typography>
          </Grid>
          <Grid xs={6} textAlign='right'>
            <Image src={ACDark} alt="Algonquin College Logo" width={300} />
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
        <Typography><b>Expected graduation:</b> April 2024</Typography>
      </CardContent>
    </Card>
  )
}

function Skills() {
  const skills = {
    'Languages': ["Python", "Java", "C/C++", "JavaScript", "PHP"],
    'Libraries': ["ReactJS", "NodeJS", "GraphQL", "Bootstrap", "Material UI", "Pandas", "NumPy", "Arduino", "Flask"],
    'Networking': ["Cisco IOS", "Juniper", "Aruba", "RouterOS"]
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
      </CardContent>
    </Card>
  )
}

export default function Home() {

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Sayfullah Eid</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Grid xs={6}><Carleton /></Grid>
          <Grid xs={6}><Algonquin /></Grid>
        </Grid>
        <Skills />
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
