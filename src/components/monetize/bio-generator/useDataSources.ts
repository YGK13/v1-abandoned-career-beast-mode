
import { useState, useEffect } from "react";
import { LinkedInData, CareerDoc } from "./types";
import { getMockLinkedInData, getMockCareerDocs } from "./utils";

export function useDataSources() {
  // Data sources state
  const [linkedInData, setLinkedInData] = useState<LinkedInData | null>(null);
  const [careerDocs, setCareerDocs] = useState<CareerDoc[]>([]);
  const [dataSourcesLoaded, setDataSourcesLoaded] = useState(false);

  // Load mock data on mount
  useEffect(() => {
    setTimeout(() => {
      setLinkedInData(getMockLinkedInData());
      setCareerDocs(getMockCareerDocs());
      setDataSourcesLoaded(true);
    }, 1500);
  }, []);

  return {
    linkedInData,
    careerDocs,
    dataSourcesLoaded
  };
}
