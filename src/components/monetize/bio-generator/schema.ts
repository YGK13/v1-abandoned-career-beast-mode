
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema
export const bioFormSchema = z.object({
  expertise: z.string().min(1, "Expertise is required"),
  experience: z.string().min(1, "Years of experience is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Must be greater than 0"),
  achievements: z.string().optional(),
  targetAudience: z.string().optional(),
  platform: z.string().optional(),
  wordLimit: z.string().optional()
    .refine((val) => !val || !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => !val || (Number(val) >= 50 && Number(val) <= 500), "Must be between 50 and 500"),
  includeLinkedIn: z.boolean().default(true),
  includeCareerDocs: z.boolean().default(true)
});

export type BioFormValues = z.infer<typeof bioFormSchema>;

// Hook to initialize the form with default values
export function useBioForm() {
  return useForm<BioFormValues>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      expertise: "",
      experience: "",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: "150",
      includeLinkedIn: true,
      includeCareerDocs: true
    }
  });
}
