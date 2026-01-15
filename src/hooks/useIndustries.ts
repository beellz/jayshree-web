import { industries, Industry } from "@/data/industries";

export type { Industry };

export function useIndustries() {
  return {
    data: industries.filter((i) => i.status === "active"),
    isLoading: false,
    error: null,
  };
}
