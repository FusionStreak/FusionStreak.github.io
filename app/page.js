'use client'

import Image from 'next/image'
import React from "react";
import { Container, Typography, Box, Card, CardContent, Divider, Chip, CardActionArea } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { Icons } from "./icons";
import { ArrowForward } from '@mui/icons-material';

const ACDark = '/ACDark.png'
const CarletonDark = '/CarletonDark.png'

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
            <Image src={CarletonDark} alt="Carleton University Logo" height={111} width={288} style={{ marginTop: '14px', marginBottom: '14px' }} priority />
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
            <Image src={CarletonDark} alt="Carleton University Logo" height={50} width={150} />
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
            <Image src={ACDark} alt="Algonquin College Logo" height={139} width={300} />
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
            <Image src={ACDark} alt="Algonquin College Logo" height={50} width={150} />
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
        <Grid container columns={{ xs: 6, lg: 12 }} sx={{ display: { xs: 'block', lg: 'flex' } }}>
          {Object.keys(skills).map((skill, idx) => {
            return (
              <React.Fragment key={idx}>
                <Grid xs={6} lg={2} mt={2} display="block" alignItems="center">
                  <b>{skill}:</b>
                </Grid>
                <Grid xs={6} lg={10} display="block" alignItems="center">
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
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Sayfullah Eid</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
          <Grid xs={6}>
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
          <Grid xs={6}>
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
          <Grid xs={6}>
            <Carleton />
          </Grid>
          <Grid xs={6}>
            <Algonquin />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
