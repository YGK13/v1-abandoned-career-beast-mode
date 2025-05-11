
import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import DataSourcesTab from "../DataSourcesTab";
import { useBioGenerator } from "../../BioGeneratorContext";

// Mock the context hook
jest.mock("../../BioGeneratorContext", () => ({
  useBioGenerator: jest.fn(),
}));

describe("DataSourcesTab", () => {
  beforeEach(() => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      linkedInData: {
        headline: "Software Engineer",
        skills: ["React", "JavaScript", "TypeScript"],
        positions: [
          { title: "Software Engineer", company: "Tech Co", duration: "2020-Present" },
          { title: "Junior Developer", company: "Startup Inc", duration: "2018-2020" }
        ]
      },
      careerDocs: [
        { type: "Resume", content: "Resume content" },
        { type: "Cover Letter", content: "Cover letter content" }
      ],
      dataSourcesLoaded: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      linkedInData: null,
      careerDocs: [],
      dataSourcesLoaded: false
    });
    
    render(<DataSourcesTab />);
    
    expect(screen.getByText(/loading your data sources/i)).toBeInTheDocument();
  });

  it("should render LinkedIn data", () => {
    render(<DataSourcesTab />);
    
    expect(screen.getByText("LinkedIn Profile")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer at Tech Co (2020-Present)")).toBeInTheDocument();
    expect(screen.getByText("Junior Developer at Startup Inc (2018-2020)")).toBeInTheDocument();
  });

  it("should render career documents", () => {
    render(<DataSourcesTab />);
    
    expect(screen.getByText("Career Documents")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
    expect(screen.getByText("Resume content")).toBeInTheDocument();
    expect(screen.getByText("Cover Letter")).toBeInTheDocument();
    expect(screen.getByText("Cover letter content")).toBeInTheDocument();
  });
});
