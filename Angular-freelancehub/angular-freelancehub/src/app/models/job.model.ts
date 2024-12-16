export interface Job {
    jobId: number;
    clientId: string;
    jobTitle: string;
    jobDesc: string;
    skillReq: string;
    skillsAsList: string[]; // derived from skillReq
    durMin: number;
    durMax: number;
    costMin: number;
    costMax: number;
    expMin: number;
    jobStat: string;
}