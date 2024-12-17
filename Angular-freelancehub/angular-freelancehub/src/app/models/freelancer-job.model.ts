export interface FreelancerJob {
    id: number;
    jobId: {
      jobId: number;
      jobTitle: string;
      clientName: string;
      
    };
    acceptedAt: string;
    remainingTime?: number;
    salary: number;
    duration: number;
    status: string;
    jobDetails: {
      progress: string;
    };
  }
  