
import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import GeneratedBioPreview from "../GeneratedBioPreview";
import { useBioGenerator } from "../../BioGeneratorContext";

// Mock the context hook
jest.mock("../../BioGeneratorContext", () => ({
  useBioGenerator: jest.fn(),
}));

describe("GeneratedBioPreview", () => {
  const mockRegenerateBio = jest.fn();
  const mockCopyToClipboard = jest.fn();
  const mockSaveBio = jest.fn();
  
  beforeEach(() => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
      expertise: ["React", "JavaScript"],
      generatedBio: "Test generated bio content.",
      isGenerating: false,
      regenerateBio: mockRegenerateBio,
      copyToClipboard: mockCopyToClipboard,
      saveBio: mockSaveBio,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
      expertise: ["React", "JavaScript"],
      generatedBio: null,
      isGenerating: true,
      regenerateBio: mockRegenerateBio,
      copyToClipboard: mockCopyToClipboard,
      saveBio: mockSaveBio,
    });
    
    render(<GeneratedBioPreview />);
    
    expect(screen.getByText(/generating your professional bio/i)).toBeInTheDocument();
  });

  it("should render placeholder when no bio is generated", () => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      firstName: "John",
      lastName: "Doe",
      expertise: ["React", "JavaScript"],
      generatedBio: null,
      isGenerating: false,
      regenerateBio: mockRegenerateBio,
      copyToClipboard: mockCopyToClipboard,
      saveBio: mockSaveBio,
    });
    
    render(<GeneratedBioPreview />);
    
    expect(screen.getByText(/fill out the form to generate a professional bio/i)).toBeInTheDocument();
  });

  it("should render generated bio", () => {
    render(<GeneratedBioPreview />);
    
    expect(screen.getByText("Test generated bio content.")).toBeInTheDocument();
  });

  it("should handle regenerate button click", () => {
    render(<GeneratedBioPreview />);
    
    userEvent.click(screen.getByRole("button", { name: /regenerate/i }));
    
    expect(mockRegenerateBio).toHaveBeenCalled();
  });

  it("should handle copy button click", () => {
    render(<GeneratedBioPreview />);
    
    userEvent.click(screen.getByRole("button", { name: /copy to clipboard/i }));
    
    expect(mockCopyToClipboard).toHaveBeenCalled();
  });

  it("should handle save button click", () => {
    render(<GeneratedBioPreview />);
    
    userEvent.click(screen.getByRole("button", { name: /save bio/i }));
    
    expect(mockSaveBio).toHaveBeenCalled();
  });
});
