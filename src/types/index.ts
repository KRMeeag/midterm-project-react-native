export type RootStackParamList = {
  Home: undefined;
  Bookmarks: undefined;
  ApplicationForm: undefined;
};

export type Job = {
  title: string;
  mainCategory: string;
  companyName: string;
  companyLogo: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: number | null;
  maxSalary: number | null;
  currency: string;
  locations: string[];
  tags: string[];
  description: string; // HTML string
  pubDate: number; // Unix timestamp
  expiryDate: number; // Unix timestamp
  applicationLink: string;
  guid: string;
};

export interface JobsProcessed extends Job {
  id: string;
  isSaved: boolean;
};

export interface JobsApiResponse {
    usage: string;
    updated_at: number;
    offset: number;
    limit: number;
    total_count: number;
    jobs: Job[];
}

export interface JobsApiResponseWithIds extends Omit<JobsApiResponse, "jobs"> {
    jobs: JobsProcessed[];
}