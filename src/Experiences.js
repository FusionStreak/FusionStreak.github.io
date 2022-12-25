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
            `Worked on an up-and-coming risk mitigation and compliance product, Verity, using React/NodeJS`,
            "Developed backend services, such as user authentication, email notiﬁcations, and internationalisation",
            "The product is currently being used by multiple organisations"
        ],
        skills: ["ReactJS", "NodeJS", "ONgDB"]
    },
    {
        company: "Sphyrna Security Inc.",
        role: "Developer Intern",
        start: { month: "May", year: 2021 },
        end: { month: "August", year: 2021 },
        notes: [
            "Implemented a visualization tool to display a graph database, ONgDB",
            "Developed a prototype of a secure encrypted ﬁle transfer device in C/C++",
        ],
        skills: ["C++", "ReactJS", "NodeJS", "ONgDB"]
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