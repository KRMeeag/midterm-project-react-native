export type RootStackParamList = {
  Home: {appliedJobId?: string};
  Bookmarks: undefined;
  ApplicationForm: { job: JobsProcessed };
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
  isApplied: boolean;
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

export interface FormValues {
  name: string;
  email: string;
  contact_number: string;
  wswhy: string;
}

export interface BottomNavProps {
  activeRoute: keyof RootStackParamList;
}

export interface JobCardProps {
  job: JobsProcessed;
  onBookmarkToggle?: (isSaved: boolean) => void;
  onApplicationToggle?: (isApplied: boolean) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}