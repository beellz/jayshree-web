import { useMemo } from "react";
import { jobs, Job } from "@/data/jobs";

export type { Job };

export function useJobs(companyId?: string) {
  const filteredJobs = useMemo(() => {
    let result = jobs.filter((j) => j.status === "open");
    if (companyId) {
      result = result.filter((j) => j.company_id === companyId);
    }
    return result;
  }, [companyId]);

  return {
    data: filteredJobs,
    isLoading: false,
    error: null,
  };
}
