import { useMemo } from "react";
import { companies, Company } from "@/data/companies";

export type { Company };

export function useCompanies(industryId?: string) {
  const filteredCompanies = useMemo(() => {
    let result = companies.filter((c) => c.status === "active");
    if (industryId) {
      result = result.filter((c) => c.industry_id === industryId);
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [industryId]);

  return {
    data: filteredCompanies,
    isLoading: false,
    error: null,
  };
}

export function useCompany(slug: string) {
  const company = useMemo(() => {
    return companies.find((c) => c.slug === slug && c.status === "active") || null;
  }, [slug]);

  return {
    data: company,
    isLoading: false,
    error: null,
  };
}
