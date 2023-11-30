'use client'

import Image from 'next/image'
import React from "react";
import { Container, Typography, Box, Button, Card, CardContent, Divider, Chip, Avatar } from "@mui/material";
import CarletonDark from './CarletonDark.png'
import ACDark from './ACDark.png'
import ReactBasicCertificate from './certifications/ReactBasicCertificate.svg'
import FrontendDeveloperReactCertificate from './certifications/FrontendDeveloperReactCertificate.svg'
import JavaBasicCertificate from './certifications/JavaBasicCertificate.svg'
import PythonBasicCertificate from './certifications/PythonBasicCertificate.svg'
import ProblemSolvingBasicCertificate from './certifications/ProblemSolvingBasicCertificate.svg'
import Grid from '@mui/material/Unstable_Grid2'
import { Icons, IconsLarge } from "./icons";
import { Masonry } from '@mui/lab';

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
        <Typography><b>Expected graduation:</b> April 2024</Typography>
      </CardContent>
    </Card>
  )
}

function Language({ language, libraries }) {
  const AvatarSX = { mx: 1, my: 1, height: 75, width: 75 }
  return (
    <Card elevation={5} sx={{ my: 2 }}>
      <CardContent>
        {IconsLarge[language.toLowerCase()]}
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} justifyContent={"center"}>
          {libraries.map((lib, idx) => {
            return (
              <Avatar key={idx} sx={AvatarSX} alt={lib} variant='rounded'>
                {IconsLarge[lib.toLowerCase()]}
              </Avatar>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default function Home() {

  const skills = {
    'Languages': ["Python", "Java", "C/C++", "JavaScript", "PHP"],
    'Libraries': ["ReactJS", "NodeJS", "GraphQL", "Bootstrap", "Material UI", "Pandas"],
    'IT': ["Cisco IOS", "Juniper", "RouterOS", "Aruba", "Nokia"],
    "Server/DevOps": ["Ubuntu", "Windows Server", "Kubernetes", "Docker", "Git"],
    'Soft Skills': ["Agile Development", "Teamwork", "Communication", "Time Management"]
  }

  const Languages = {
    "Python": ["Pandas", "Flask", "NumPy"],
    "C/C++": ["Arduino", "Embedded Systems"],
    "JavaScript": ["ReactJS", "NodeJS", "Bootstrap", "Material UI"],
    "Other": ["Java", "PHP", "SQL"]
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Sayfullah Eid</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2}>
          <Carleton />
          <Algonquin />
          <Language language="Python" libraries={Languages["Python"]} />
          <Language language="C/C++" libraries={Languages["C/C++"]} />
          <Language language="JavaScript" libraries={Languages["JavaScript"]} />
          <Language language="Other" libraries={Languages["Other"]} />
        </Masonry>
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
