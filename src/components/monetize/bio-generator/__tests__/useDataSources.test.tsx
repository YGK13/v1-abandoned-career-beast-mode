
import { renderHook, act, waitFor } from "@testing-library/react";
import { useDataSources } from "../useDataSources";
import { getMockLinkedInData, getMockCareerDocs } from "../utils";

// Mock the utility functions
jest.mock("../utils", () => ({
  getMockLinkedInData: jest.fn(),
  getMockCareerDocs: jest.fn(),
}));

describe("useDataSources", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (getMockLinkedInData as jest.Mock).mockReturnValue({
      headline: "Test headline",
      skills: ["Skill 1", "Skill 2"],
      positions: [{ title: "Test title", company: "Test company", duration: "2020-2023" }],
    });
    (getMockCareerDocs as jest.Mock).mockReturnValue([
      { type: "Resume", content: "Test content" },
    ]);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDataSources());
    
    expect(result.current.linkedInData).toBeNull();
    expect(result.current.careerDocs).toEqual([]);
    expect(result.current.dataSourcesLoaded).toBe(false);
  });

  it("should load mock data after delay", async () => {
    const { result } = renderHook(() => useDataSources());
    
    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    // Check that the data has been loaded
    await waitFor(() => {
      expect(result.current.linkedInData).toEqual({
        headline: "Test headline",
        skills: ["Skill 1", "Skill 2"],
        positions: [{ title: "Test title", company: "Test company", duration: "2020-2023" }],
      });
      expect(result.current.careerDocs).toEqual([
        { type: "Resume", content: "Test content" },
      ]);
      expect(result.current.dataSourcesLoaded).toBe(true);
    });
  });
});
