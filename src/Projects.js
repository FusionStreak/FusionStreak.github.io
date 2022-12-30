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
const Projects = [
    {
        name: "foodpad",
        role: "Frontend Developer",
        notes: [
            "A prototype application to help track groceries and food waste",
            "Developed the front-end of the demo site, based on the designs from my colleagues."
        ],
        urls: {
            "Devpost": "https://devpost.com/software/foodpad",
            "GitHub": "https://github.com/ke-noel/foodpad"
        },
        date: { month: "January", year: 2022 },
        org: "McHacks 9 | MLH",
        skills: ["ReactJS", "Figma"],
        awards: {"Top 5 Hacks": "One of the top 5 hacks at McHacks 9", "Tree Hugger": "Award for the hack that best promoted sustainability"}
    },
    {
        name: "PlagueSim",
        role: "Lead Developer",
        notes: [
            "A CLI based application that simulates network attacks on nodes in a map",
            "Designed the general structure of the application",
            "Implemented core data structures and functionality"
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
            "A Slack integrated app that performs daily check-ins on employee mental health",
            "Developed a cognitive memory game in JavaScript"
        ],
        urls: {
            "Devpost": "https://devpost.com/software/harmonia",
            "GitHub": "https://github.com/banaru4/Harmonia"
        },
        date: { month: "January", year: 2020 },
        org: "ConUHacks V | MLH",
        skills: ["Javascript", "Slack"],
        awards: {"Sun Life Financial": "Award for the app that best helped support mental health in the workplace"}
    },
    {
        name: "Orion",
        role: "Developer",
        notes: [
            "A Python web-app, that processed building footprint data to show where solar rooﬁng was possible",
            "Performed data cleansing and manipulation to prepare it for the algorithm"
        ],
        urls: {
            "GitHub": "https://github.com/ogp-summit-hackathon-sommet-pgo/Orion"},
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

export default Projects