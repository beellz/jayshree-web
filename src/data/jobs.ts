export interface Job {
  id: string;
  company_id: string | null;
  title: string;
  description: string | null;
  location: string | null;
  job_type: string | null;
  experience_level: string | null;
  salary_range: string | null;
  requirements: string | null;
  status: string;
  created_at: string;
  companies?: {
    id: string;
    name: string;
    slug: string;
    industries?: {
      name: string;
    } | null;
  } | null;
}

// Currently no active job listings
export const jobs: Job[] = [];
