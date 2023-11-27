/**
 * List of project as objects
 * 
 * Template
 * ```js
 * {
 *  name: string,
 *  role: string,
 *  notes: string[],
 *  urls: {name: string,...},
 *  date: {month: string, year: number},
 *  org: string,
 *  skills: string[],
 *  awards: string[]
 * }
 * ```
 */

'use client'

import { useEffect, useState } from "react";
import Projects from "./Projects";
import { Container, Box, Typography } from "@mui/material";

const projects = [
    {
        name: "LEO Satelite Routing and Load Balancing",
        role: "Team Lead",
        notes: [
            "Designing new load-balancing mechanisms for use in Low Eart Orbit networks",
            "Extending the functionality of LEOSIM",
            "Implementing load-balancing designs in LEOSIM"
        ],
        urls: {},
        start: { month: "September", year: 2023 },
        end: { month: "April", year: 2024 },
        org: "Capstone Project | Carleton University",
        skills: ["Python"],
        awards: {}
    },
    {
        name: "GoodStreams",
        role: "Team Lead",
        notes: [
            "Designed general structure of the website",
            "Implemented backend functionality to communicate with MoviesDatabase API",
            "Designed the database to store user information"
        ],
        urls: {
            "GitHub": "https://github.com/FusionStreak/GoodStreams"
        },
        date: { month: "April", year: 2023 },
        org: "Web Programming Project | Algonquin College",
        skills: ["php", "javascript"],
        awards: {}
    },
    {
        name: "foodpad",
        role: "Frontend Developer",
        notes: [
            "Implemented a prototype application to help track groceries and food waste, using React",
            "Developed the front-end of the demo site, based on the designs from my colleagues."
        ],
        urls: {
            "Devpost": "https://devpost.com/software/foodpad",
            "GitHub": "https://github.com/ke-noel/foodpad"
        },
        date: { month: "January", year: 2022 },
        org: "McHacks 9 | MLH",
        skills: ["ReactJS", "Figma"],
        awards: { "Top 5 Hacks": "One of the top 5 hacks at McHacks 9", "Tree Hugger": "Award for the hack that best promoted sustainability" }
    },
    {
        name: "PlagueSim",
        role: "Lead Developer",
        notes: [
            "Designed the general structure of the application through the use of UML diagrams",
            "Implemented core data structures and functionality in Java"
        ],
        urls: {
            "GitHub": "https://github.com/FusionStreak/MST_TermProject"
        },
        date: { month: "December", year: 2021 },
        org: "Data Structures Project | Carleton University",
        skills: ["Java", "Data Structures"],
        awards: []
    },
    {
        name: "harmonia",
        role: "Frontend Developer",
        notes: [
            "Developed a cognitive memory game using JavaScript that integrated with a Slack app, to perform daily check-ins on employee mental health"
        ],
        urls: {
            "Devpost": "https://devpost.com/software/harmonia",
            "GitHub": "https://github.com/banaru4/Harmonia"
        },
        date: { month: "January", year: 2020 },
        org: "ConUHacks V | MLH",
        skills: ["Javascript", "Slack"],
        awards: { "Sun Life Financial": "Award for the app that best helped support mental health in the workplace" }
    },
    {
        name: "Orion",
        role: "Developer",
        notes: [
            "Developed Python web-app, that processed building footprint data to show where solar roofing was possible",
            "Used Pandas to clean the incoming data"
        ],
        urls: {
            "GitHub": "https://github.com/ogp-summit-hackathon-sommet-pgo/Orion"
        },
        date: { month: "May", year: 2019 },
        org: "Ottawa Summit | Open Government Partnetship",
        skills: ["Python", "Pandas"],
        awards: []
    },
    {
        name: "RoboRavens",
        role: "Programmer",
        notes: [
            "Developed C/C++ code for a robot to complete a set of challenges"
        ],
        urls: {},
        date: { month: "January", year: 2018 },
        org: "Team 4783 | FIRST Robotics",
        skills: ["FIRST", "C++", "Embedded Systems"],
        awards: []
    }
]

export default function Page() {

    return (
        <Container>

            <Box sx={{ my: 2 }}>
                <Typography variant="h4">Projects</Typography>
            </Box>
            <Projects projects={projects} />
        </Container>
    )
}