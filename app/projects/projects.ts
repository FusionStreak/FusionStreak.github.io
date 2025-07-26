export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
    createdAt: string;
    status: "completed" | "in-progress" | "planning";
}

// You can easily extend this array to add more projects
export const projects: Project[] = [
    
];