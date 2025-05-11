
import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import FormFields from "../FormFields";
import { useBioGenerator } from "../../BioGeneratorContext";
import { BioFormValues } from "../types";

// Mock the context hook
jest.mock("../../BioGeneratorContext", () => ({
  useBioGenerator: jest.fn(),
}));

describe("FormFields", () => {
  const mockForm = {
    register: jest.fn(),
    handleSubmit: (callback: any) => (e: React.FormEvent) => {
      e.preventDefault();
      callback({ 
        expertise: "React, JavaScript", 
        experience: "5",
        includeLinkedIn: true,
        includeCareerDocs: true
      });
    },
    control: jest.fn(),
    formState: { 
      errors: {} 
    },
    watch: jest.fn().mockReturnValue("professional"),
  };
  
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      isGenerating: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render form fields", () => {
    render(<FormFields />);
    
    expect(screen.getByLabelText(/your area of expertise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years of experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/key achievements/i)).toBeInTheDocument();
  });

  it("should handle form submission", () => {
    render(<FormFields />);
    
    // Fill out form
    userEvent.type(screen.getByLabelText(/your area of expertise/i), "React, JavaScript");
    userEvent.type(screen.getByLabelText(/years of experience/i), "5");
    
    // Submit form
    userEvent.click(screen.getByRole("button", { name: /generate bio/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      expertise: "React, JavaScript",
      experience: "5",
      includeLinkedIn: true,
      includeCareerDocs: true
    });
  });

  it("should disable submit button when generating", () => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      isGenerating: true,
    });
    
    render(<FormFields />);
    
    const submitButton = screen.getByRole("button", { name: /generating/i });
    expect(submitButton).toBeDisabled();
  });

  it("should display validation errors", () => {
    const formWithErrors = {
      ...mockForm,
      formState: {
        errors: {
          expertise: {
            message: "Expertise is required"
          },
          experience: {
            message: "Years of experience is required"
          }
        }
      }
    };
    
    (useBioGenerator as jest.Mock).mockReturnValue({
      form: formWithErrors,
      onSubmit: mockOnSubmit,
      isGenerating: false,
    });
    
    render(<FormFields />);
    
    expect(screen.getByText(/please fix the errors below/i)).toBeInTheDocument();
  });
});
