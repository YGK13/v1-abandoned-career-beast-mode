
import { renderHook } from "@testing-library/react";
import { bioFormSchema, useBioForm } from "../schema";

describe("Bio Form Schema", () => {
  it("should validate required fields", () => {
    const result = bioFormSchema.safeParse({
      expertise: "",
      experience: "",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: "150",
      includeLinkedIn: true,
      includeCareerDocs: true
    });

    expect(result.success).toBe(false);
    
    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.expertise?._errors).toContain("Expertise is required");
      expect(formattedErrors.experience?._errors).toContain("Years of experience is required");
    }
  });

  it("should validate numeric inputs", () => {
    const result = bioFormSchema.safeParse({
      expertise: "React",
      experience: "abc",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: "1000",
      includeLinkedIn: true,
      includeCareerDocs: true
    });

    expect(result.success).toBe(false);
    
    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.experience?._errors).toContain("Must be a valid number");
      expect(formattedErrors.wordLimit?._errors).toContain("Must be between 50 and 500");
    }
  });

  it("should validate experience is positive", () => {
    const result = bioFormSchema.safeParse({
      expertise: "React",
      experience: "-1",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: "150",
      includeLinkedIn: true,
      includeCareerDocs: true
    });

    expect(result.success).toBe(false);
    
    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.experience?._errors).toContain("Must be greater than 0");
    }
  });

  it("should accept valid inputs", () => {
    const result = bioFormSchema.safeParse({
      expertise: "React",
      experience: "5",
      achievements: "Created a great app",
      targetAudience: "Developers",
      platform: "LinkedIn",
      wordLimit: "150",
      includeLinkedIn: true,
      includeCareerDocs: true
    });

    expect(result.success).toBe(true);
  });

  it("should initialize form with default values", () => {
    const { result } = renderHook(() => useBioForm());
    
    expect(result.current.getValues()).toEqual({
      expertise: "",
      experience: "",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: "150",
      includeLinkedIn: true,
      includeCareerDocs: true
    });
  });
});
