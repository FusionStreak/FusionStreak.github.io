'use client'

import Image from 'next/image'
import React from "react";
import { Container, Typography, Box, Card, CardContent, Divider, Chip, CardActionArea, Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";
import Grid from '@mui/material/Grid'
import { Icons } from "./icons";
import { ArrowForward } from '@mui/icons-material';

const ACDark = '/ACDark.png'
const CarletonDark = '/CarletonDark.png'

const carleton = {
  'SYSC 1005': {
    'title': 'Intro to Software Development',
    'description': 'Introduction to programming using Python. Topics include data types, control structures, functions, and object-oriented programming.',
    'skills': ['Python', 'Object-Oriented Programming']
  },
  'SYSC 2006': {
    'title': 'Foundation of Imperative Programming',
    'description': 'The imperative programming paradigm: assignment and state, types and variables, static and dynamic typing. Control structures, functions, and parameter passing.',
    'skills': ['C/C++']
  },
  'BIT 1400': {
    'title': 'Introduction to Programming and Problem Solving',
    'description': 'Introduction to basic concepts of procedural programming and algorithm design in C.',
    'skills': ['C/C++']
  },
  'NET 2007': {
    'title': 'Basics of Transmission Systems',
    'description': 'Introduction to the fundamentals of information transmissions systems used in physical layer of the Internet.',
    'skills': ['Networking']
  },
  'NET 2013': {
    'title': 'Computer Systems Foundations',
    'description': 'Introduction to the design and implementation of digital circuits and microprocessors.',
    'skills': ['Digital Circuits', 'Microprocessors', "Assembly"]
  },
  'BIT 2400': {
    'title': 'Intermediate Programming',
    'description': 'Introduction to object-oriented programming and algorithm design in C++.',
    'skills': ['C/C++']
  },
  'NET 3004': {
    'title': 'Data Structures',
    'description': 'Specification and design of abstract data types and their implementation as stacks, queues, trees, tables and graphs.',
    'skills': ['Data Structures', 'Java']
  },
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
        <Grid container columns={{ xs: 6, lg: 12 }} sx={{ display: { xs: 'block', lg: 'flex' } }}>
          {Object.keys(skills).map((skill, idx) => {
            return (
              <React.Fragment key={idx}>
                <Grid size={{xs:6, lg: 2}} mt={2} display="block" alignItems="center">
                  <b>{skill}:</b>
                </Grid>
                <Grid size={{xs:6, lg: 10}} display="block" alignItems="center">
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
  const [open, setOpen] = React.useState('none');

  const handleClickOpen = (modal) => {
    setOpen(modal);
  };

  const handleClose = () => {
    setOpen('none');
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Sayfullah Eid</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid size={{ xs: 6 }}>
            <Card>
              <CardActionArea href='/experience'>
                <CardContent>
                  <Typography variant='h3'>Experience</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='h6'>Internships & Professional Experience</Typography>
                  <ArrowForward />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Card>
              <CardActionArea href='/projects'>
                <CardContent>
                  <Typography variant='h3'>Projects</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='h6'>Hackathons, Personal & Course Projects</Typography>
                  <ArrowForward />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Card elevation={5} sx={{ my: 2 }} >
              <CardActionArea onClick={() => { handleClickOpen('carleton') }}>
                <CardContent>
                  <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="h6">Bachelor of Information Technology</Typography>
                      <Typography variant="overline">Network Technology</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }} textAlign='right'>
                      <Image src={CarletonDark} alt="Carleton University Logo" height={111} width={288} style={{ marginTop: '14px', marginBottom: '14px' }} priority />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h6">Bachelor of Information Technology</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="overline" >Network Technology</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }} >
                      <Image src={CarletonDark} alt="Carleton University Logo" height={50} width={150} />
                    </Grid>
                  </Grid>
                  <Typography><b>Expected Graduation:</b> April 2024</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Card elevation={5} sx={{ my: 2 }} >
              <CardActionArea>
                <CardContent onClick={() => { handleClickOpen('algonquin') }}>
                  <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="h6">Advanced Diploma in Computer Engineering Technology</Typography>
                      <Typography variant="overline">Network Technology</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }} textAlign='right'>
                      <Image src={ACDark} alt="Algonquin College Logo" height={139} width={300} />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="h6">Advanced Diploma in Computer Engineering Technology</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="overline">Network Technology</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }} >
                      <Image src={ACDark} alt="Algonquin College Logo" height={50} width={150} />
                    </Grid>
                  </Grid>
                  <Typography><b>Expected graduation:</b> April 2024</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open === 'carleton'} onClose={handleClose}>
        <DialogTitle>Carleton University</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Bachelor of Information Technology</Typography>
          <Typography variant="overline">Network Technology</Typography>
          <Typography><b>Expected Graduation:</b> April 2024</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open === 'algonquin'} onClose={handleClose}>
        <DialogTitle>Algonquin College</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Advanced Diploma in Computer Engineering Technology</Typography>
          <Typography variant="overline">Network Technology</Typography>
          <Typography><b>Expected graduation:</b> April 2024</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
