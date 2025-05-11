
import React from "react";
import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { BioGeneratorProvider, useBioGenerator } from "../../BioGeneratorContext";
import { useBioGeneration } from "../useBioGeneration";
import { useDataSources } from "../useDataSources";
import { useBioForm } from "../schema";

// Mock the hooks we're testing
jest.mock("../useBioGeneration", () => ({
  useBioGeneration: jest.fn(),
}));

jest.mock("../useDataSources", () => ({
  useDataSources: jest.fn(),
}));

jest.mock("../schema", () => ({
  useBioForm: jest.fn(),
}));

// Test component that consumes the context
const TestComponent = () => {
  const { firstName, lastName, generatedBio } = useBioGenerator();
  return (
    <div>
      <div data-testid="first-name">{firstName}</div>
      <div data-testid="last-name">{lastName}</div>
      <div data-testid="generated-bio">{generatedBio || "No bio generated"}</div>
    </div>
  );
};

describe("BioGeneratorContext", () => {
  const mockGenerateBio = jest.fn();
  const mockRegenerateBio = jest.fn();
  const mockCopyToClipboard = jest.fn();
  const mockSaveBio = jest.fn();
  const mockForm = { formValue: "test-form" };
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    (useBioGeneration as jest.Mock).mockReturnValue({
      generatedBio: "Test generated bio",
      isGenerating: false,
      generateBio: mockGenerateBio,
      regenerateBio: mockRegenerateBio,
      copyToClipboard: mockCopyToClipboard,
      saveBio: mockSaveBio,
    });

    (useDataSources as jest.Mock).mockReturnValue({
      linkedInData: { headline: "Test headline" },
      careerDocs: [{ type: "Resume", content: "Test content" }],
      dataSourcesLoaded: true,
    });

    (useBioForm as jest.Mock).mockReturnValue(mockForm);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should provide context values to consumers", async () => {
    render(
      <BioGeneratorProvider>
        <TestComponent />
      </BioGeneratorProvider>
    );
    
    // Initial values should be empty
    expect(screen.getByTestId("first-name").textContent).toBe("");
    expect(screen.getByTestId("last-name").textContent).toBe("");
    
    // The generated bio should come from the mock
    expect(screen.getByTestId("generated-bio").textContent).toBe("Test generated bio");
  });

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => render(<TestComponent />)).toThrow(
      "useBioGenerator must be used within a BioGeneratorProvider"
    );
    
    // Restore console.error
    console.error = originalError;
  });
});
