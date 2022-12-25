/**
 * List of project as objects
 * 
 * Template
 * ```js
 * {
 *  name: string,
 *  role: string,
 *  notes: string[],
 *  url: string,
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
        url: "https://devpost.com/software/foodpad",
        date: { month: "January", year: 2022 },
        org: "McHacks 9 | MLH",
        skills: ["ReactJS", "Figma"],
        awards: ["Top 5 Hacks", "Tree Hugger"]
    },
    {
        name: "PlagueSim",
        role: "Lead Developer",
        notes: [
            "A CLI based application that simulates network attacks on nodes in a map",
            "Designed the general structure of the application",
            "Implemented core data structures and functionality"
        ],
        url: "https://github.com/FusionStreak/MST_TermProject",
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
        url: "https://devpost.com/software/harmonia",
        date: { month: "January", year: 2020 },
        org: "ConUHacks V | MLH",
        skills: ["Javascript", "Slack"],
        awards: ["Sun Life Financial"]
    },
    {
        name: "Orion",
        role: "Developer",
        notes: [
            "A Python web-app, that processed building footprint data to show where solar rooﬁng was possible",
            "Performed data cleansing and manipulation to prepare it for the algorithm"
        ],
        url: "https://github.com/ogp-summit-hackathon-sommet-pgo/Orion",
        date: { month: "May", year: 2019 },
        org: "Ottawa 2019 | Open Government Summit",
        skills: ["Python", "Pandas"],
        awards: []
    }
]

export default Projects