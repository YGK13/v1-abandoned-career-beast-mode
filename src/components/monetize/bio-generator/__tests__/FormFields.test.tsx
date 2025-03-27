
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    formState: { errors: {} },
    watch: jest.fn().mockReturnValue("professional"),
  };
  
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      firstName: "John",
      setFirstName: jest.fn(),
      lastName: "Doe",
      setLastName: jest.fn(),
      headline: "Software Engineer",
      setHeadline: jest.fn(),
      tone: "professional",
      setTone: jest.fn(),
      length: "medium",
      setLength: jest.fn(),
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
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/professional headline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/areas of expertise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years of experience/i)).toBeInTheDocument();
  });

  it("should handle form submission", () => {
    render(<FormFields />);
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/professional headline/i), { target: { value: "Software Engineer" } });
    
    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /generate bio/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      expertise: "React, JavaScript",
      experience: "5",
      includeLinkedIn: true,
      includeCareerDocs: true
    });
  });

  it("should disable submit button when generating", () => {
    (useBioGenerator as jest.Mock).mockReturnValue({
      firstName: "John",
      setFirstName: jest.fn(),
      lastName: "Doe",
      setLastName: jest.fn(),
      headline: "Software Engineer",
      setHeadline: jest.fn(),
      tone: "professional",
      setTone: jest.fn(),
      length: "medium",
      setLength: jest.fn(),
      form: mockForm,
      onSubmit: mockOnSubmit,
      isGenerating: true,
    });
    
    render(<FormFields />);
    
    const submitButton = screen.getByRole("button", { name: /generate bio/i });
    expect(submitButton).toBeDisabled();
  });
});
