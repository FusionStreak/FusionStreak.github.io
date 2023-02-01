/**
 * List of experiences as objects
 * 
 * Template:
 * ```js
 * {
 *  company: string,
 *  role: string,
 *  start: {month: string, year: number},
 *  end: {month: string, year: number},
 *  notes: string[],
 *  skills: string[]
 * }
 * ```
 */
const Experiences = [
    {
        company: "Sphyrna Security Inc.",
        role: "Web Developer Intern",
        start: { month: "January", year: 2022 },
        end: { month: "December", year: 2022 },
        notes: [
            "Developed a full stack React/NodeJS solution to load the front-end web application in the user's preferred language, which increased our customer adoption rate as we could deploy to more regions",
            "Implemented a secure authentication system using JWT, web cookies, and multi-factor authentication",
            "Followed up on customer reported issues through GitLab"
        ],
        skills: ["ReactJS", "NodeJS", "ONgDB", "Bootstrap"]
    },
    {
        company: "Sphyrna Security Inc.",
        role: "Developer Intern",
        start: { month: "May", year: 2021 },
        end: { month: "August", year: 2021 },
        notes: [
            "Collaborated with colleagues to develop prototype software in C/C++, to determine viability as products",
            "Conducted research on Python attribute-based encryption implementations for use with our secure network products",
        ],
        skills: ["C++", "Python"]
    },
    {
        company: "Wize Computing Academy",
        role: "Summer Intern",
        start: { month: "July", year: 2020 },
        end: { month: "August", year: 2020 },
        notes: [
            "Designed lesson plans to teach coding skills for students aged 6 and up",
        ],
        skills: ["Google Docs", "Python", "Scratch", "LabView"]
    },
]


export default Experiences