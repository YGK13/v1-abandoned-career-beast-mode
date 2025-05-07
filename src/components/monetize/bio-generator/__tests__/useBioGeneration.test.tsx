
import { renderHook, act } from "@testing-library/react";
import { useBioGeneration } from "../useBioGeneration";
import { getBioTemplates } from "../utils";
import { useToast } from "@/hooks/use-toast";

// Mock the utility functions and hooks
jest.mock("../utils", () => ({
  getBioTemplates: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("useBioGeneration", () => {
  const mockToast = { toast: jest.fn() };
  const mockBioTemplates = {
    professional: "Professional bio template",
    conversational: "Conversational bio template",
    academic: "Academic bio template",
  };

  beforeEach(() => {
    jest.useFakeTimers();
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (getBioTemplates as jest.Mock).mockReturnValue(mockBioTemplates);
    
    // Mock clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn() },
      configurable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useBioGeneration());
    
    expect(result.current.generatedBio).toBeNull();
    expect(result.current.isGenerating).toBe(false);
  });

  it("should show error toast if required fields are missing", () => {
    const { result } = renderHook(() => useBioGeneration());
    
    act(() => {
      result.current.generateBio("", "", "", "", [], "professional", "medium", true, true, null, []);
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Missing Information",
      description: "Please fill in all required fields before generating a bio",
      variant: "destructive",
    });
  });

  it("should generate a professional bio", () => {
    const { result } = renderHook(() => useBioGeneration());
    
    act(() => {
      result.current.generateBio(
        "John", 
        "Doe", 
        "Software Engineer", 
        "5", 
        ["JavaScript", "React"], 
        "professional", 
        "medium", 
        false, 
        false,
        null,
        []
      );
    });
    
    expect(result.current.isGenerating).toBe(true);
    
    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    expect(result.current.generatedBio).toBe("Professional bio template");
    expect(result.current.isGenerating).toBe(false);
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Success",
      description: "Bio generated successfully!",
    });
  });

  it("should regenerate bio", () => {
    const { result } = renderHook(() => useBioGeneration());
    
    // First generate a bio
    act(() => {
      result.current.generateBio(
        "John", 
        "Doe", 
        "Software Engineer", 
        "5", 
        ["JavaScript", "React"], 
        "professional", 
        "medium", 
        false, 
        false,
        null,
        []
      );
      jest.advanceTimersByTime(1500);
    });
    
    // Then regenerate it
    act(() => {
      result.current.regenerateBio("John", ["JavaScript", "React"], null, []);
    });
    
    expect(result.current.isGenerating).toBe(true);
    
    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(result.current.isGenerating).toBe(false);
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Success",
      description: "Bio regenerated with new variations",
    });
  });

  it("should copy bio to clipboard", () => {
    const { result } = renderHook(() => useBioGeneration());
    
    // First generate a bio
    act(() => {
      result.current.generateBio(
        "John", 
        "Doe", 
        "Software Engineer", 
        "5", 
        ["JavaScript", "React"], 
        "professional", 
        "medium", 
        false, 
        false,
        null,
        []
      );
      jest.advanceTimersByTime(1500);
    });
    
    // Then copy it
    act(() => {
      result.current.copyToClipboard();
    });
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Professional bio template");
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Copied",
      description: "Bio copied to clipboard",
    });
  });

  it("should save bio", () => {
    const { result } = renderHook(() => useBioGeneration());
    
    // First generate a bio
    act(() => {
      result.current.generateBio(
        "John", 
        "Doe", 
        "Software Engineer", 
        "5", 
        ["JavaScript", "React"], 
        "professional", 
        "medium", 
        false, 
        false,
        null,
        []
      );
      jest.advanceTimersByTime(1500);
    });
    
    // Then save it
    act(() => {
      result.current.saveBio();
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Saved",
      description: "Bio saved to your assets",
    });
  });
});
