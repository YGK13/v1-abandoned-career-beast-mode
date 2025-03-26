
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

const Help: React.FC = () => {
  const [dailyTip, setDailyTip] = useState<string>(
    "Today's tip: Schedule 15 minutes each week to update your skills and achievements in SkillSync to ensure your profile stays current."
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
            <p className="text-muted-foreground">
              Learn how to use SkillSync effectively to advance your career
            </p>
          </div>

          <Alert className="bg-primary/5 border-primary/20">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Daily Career Tip</AlertTitle>
            <AlertDescription>{dailyTip}</AlertDescription>
          </Alert>

          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="profile">Profile Management</TabsTrigger>
              <TabsTrigger value="skills">Skills & Development</TabsTrigger>
              <TabsTrigger value="documents">Documents & Portfolio</TabsTrigger>
              <TabsTrigger value="jobs">Job Recommendations</TabsTrigger>
              <TabsTrigger value="salary">Salary Insights</TabsTrigger>
              <TabsTrigger value="coaching">Career Coaching</TabsTrigger>
            </TabsList>

            {/* Getting Started Section */}
            <TabsContent value="getting-started" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Getting Started with SkillSync</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-skillsync">
                  <AccordionTrigger>What is SkillSync?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync is a comprehensive career management platform designed to help you proactively manage and advance your career. It integrates various aspects of your professional life, including skills, achievements, documents, and job opportunities, into a single dashboard.</p>
                    <p>Our platform uses AI to provide personalized recommendations for skill development, job opportunities, and career growth strategies, all tailored to your specific profile and career goals.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-to-setup">
                  <AccordionTrigger>How do I set up my SkillSync account?</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Sign up with your email address or using your LinkedIn account.</li>
                      <li>Complete your basic profile information including your name, current position, and career objectives.</li>
                      <li>Import your LinkedIn profile data (see "How do I import my LinkedIn profile?" for details).</li>
                      <li>Upload your resume and any supporting documents like performance reviews or certificates.</li>
                      <li>Add your skills and indicate your proficiency level for each.</li>
                      <li>Set your career goals and preferences for job recommendations.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="linkedin-import">
                  <AccordionTrigger>How do I import my LinkedIn profile?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Importing your LinkedIn profile is a quick way to populate your SkillSync account with your professional history:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>From your Dashboard, click on the "Import from LinkedIn" button.</li>
                      <li>You'll be redirected to LinkedIn to authorize SkillSync.</li>
                      <li>Select which data you want to import (work history, skills, education, etc.).</li>
                      <li>After authorization, your data will be imported automatically.</li>
                      <li>Review the imported information and make any necessary adjustments.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Note: SkillSync only imports the information you specifically authorize and does not store your LinkedIn credentials.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="navigation">
                  <AccordionTrigger>How do I navigate the SkillSync platform?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync has a simple, intuitive navigation structure:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Dashboard:</strong> Your central hub with an overview of your career health, recent activity, and recommended actions.</li>
                      <li><strong>Skills:</strong> Manage your skills inventory, track proficiency levels, and discover recommended skills to develop.</li>
                      <li><strong>Documents:</strong> Store and organize resumes, performance reviews, certificates, and other career-related documents.</li>
                      <li><strong>Jobs:</strong> Browse job recommendations tailored to your profile, manage applications, and track application status.</li>
                      <li><strong>Help:</strong> Access detailed guides, tutorials, and FAQs about using SkillSync effectively.</li>
                    </ul>
                    <p className="mt-2">Use the navigation bar at the top of the screen to move between these sections. On mobile devices, access the menu by tapping the menu icon in the top-right corner.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Profile Management Section */}
            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Profile Management</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="profile-completeness">
                  <AccordionTrigger>How can I maximize my profile completeness?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">A complete profile is essential for getting the most accurate recommendations from SkillSync:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Fill out all sections of your profile, including work history, education, and career objectives.</li>
                      <li>Add a professional photo to increase profile recognition.</li>
                      <li>Include detailed descriptions of your roles and responsibilities in each position.</li>
                      <li>Add all relevant skills and rate your proficiency honestly.</li>
                      <li>Upload supporting documents like performance reviews and certificates.</li>
                      <li>Connect your social profiles like LinkedIn, GitHub, or portfolio websites.</li>
                      <li>Regularly update your profile with new achievements, skills, and experiences.</li>
                    </ul>
                    <p className="mt-2">Your profile completeness score is displayed on your Dashboard, along with specific recommendations for improving it.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="update-work-history">
                  <AccordionTrigger>How do I update my work history?</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Navigate to your Profile section.</li>
                      <li>Scroll to the "Work History" section and click "Edit" or "Add Experience."</li>
                      <li>Enter details about each position, including company name, title, dates, and a detailed description of your responsibilities and achievements.</li>
                      <li>For best results, include specific metrics and accomplishments for each role.</li>
                      <li>Add tags for technologies, tools, or methodologies used in each role.</li>
                      <li>Save your changes.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Tip: When describing your roles, focus on achievements rather than just responsibilities, and quantify your impact whenever possible.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="upload-performance-reviews">
                  <AccordionTrigger>How do I upload performance reviews?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Performance reviews provide valuable insights into your strengths and areas for improvement:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to the Documents section of your profile.</li>
                      <li>Select "Upload New Document" and choose "Performance Review" as the document type.</li>
                      <li>Upload your performance review document (PDF, Word, or image).</li>
                      <li>Add relevant metadata such as the review date, manager name, and overall rating.</li>
                      <li>Tag key strengths and improvement areas mentioned in the review.</li>
                      <li>If you have a physical copy, you can take a clear photo and upload it as an image.</li>
                    </ol>
                    <p className="mt-2">SkillSync's AI will analyze your performance reviews to identify patterns in your strengths and areas for development, which will inform your personalized career coaching recommendations.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacy-settings">
                  <AccordionTrigger>How can I control my privacy settings?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync gives you full control over your data privacy:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to your Profile and click on "Privacy Settings."</li>
                      <li>Choose which parts of your profile are visible to potential employers or recruiters.</li>
                      <li>Set permissions for how your data is used for job matching and recommendations.</li>
                      <li>Control email notification preferences for job alerts and career tips.</li>
                      <li>Manage third-party data sharing options.</li>
                      <li>Set up two-factor authentication to secure your account.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Note: Your sensitive documents like performance reviews are always private by default and are never shared with employers or recruiters.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Skills Section */}
            <TabsContent value="skills" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Skills & Development</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="add-skills">
                  <AccordionTrigger>How do I add and rate my skills?</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Navigate to the Skills section in your SkillSync dashboard.</li>
                      <li>Click on "Add New Skill" to open the skill addition form.</li>
                      <li>Search for skills in our database or add custom skills that aren't listed.</li>
                      <li>Rate your proficiency for each skill on a scale of 1-5:
                        <ul className="list-disc pl-5 mt-1">
                          <li><strong>1 (Beginner):</strong> Basic understanding, limited practical experience</li>
                          <li><strong>2 (Developing):</strong> Growing knowledge, some practical application</li>
                          <li><strong>3 (Proficient):</strong> Solid understanding, regular practical application</li>
                          <li><strong>4 (Advanced):</strong> Deep knowledge, can solve complex problems</li>
                          <li><strong>5 (Expert):</strong> Comprehensive mastery, can teach others, recognized authority</li>
                        </ul>
                      </li>
                      <li>Add details about how you've applied each skill in your work.</li>
                      <li>Upload evidence of your skill level, such as certifications or project examples.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Tip: Be honest in your self-assessment. It's better to accurately rate your skills than to overstate your abilities.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skill-gap-analysis">
                  <AccordionTrigger>How does the skill gap analysis work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync's skill gap analysis helps you identify which skills you should develop to reach your career goals:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Our AI analyzes your current skills and compares them to the requirements for your target roles or career path.</li>
                      <li>The system identifies gaps between your current skillset and what's needed for your desired roles.</li>
                      <li>Skills are prioritized based on their impact on your employability and career advancement.</li>
                      <li>For each gap identified, SkillSync recommends specific learning resources and development paths.</li>
                      <li>As you acquire new skills or improve existing ones, your gap analysis is updated in real-time.</li>
                    </ol>
                    <p className="mt-2">To get the most accurate analysis, make sure your career goals are clearly defined in your profile settings, and keep your skills inventory up to date.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="upload-certificates">
                  <AccordionTrigger>How do I upload certificates and credentials?</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to the Documents section in your SkillSync dashboard.</li>
                      <li>Click on "Upload New Document" and select "Certificate/Credential" as the document type.</li>
                      <li>Upload your certificate file (PDF, image, etc.).</li>
                      <li>Add metadata including:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Certificate name/title</li>
                          <li>Issuing organization</li>
                          <li>Date issued and expiration date (if applicable)</li>
                          <li>Skills validated by this certificate</li>
                          <li>Credential ID or verification link (if available)</li>
                        </ul>
                      </li>
                      <li>Choose whether to make this certificate visible to potential employers.</li>
                    </ol>
                    <p className="mt-2">Your certificates will be linked to the relevant skills in your profile, providing verification of your expertise. They will also be automatically included in custom resumes when those skills are relevant to the position.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recommended-learning">
                  <AccordionTrigger>How do I use the recommended learning resources?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync provides personalized learning recommendations to help you develop the skills needed for career advancement:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Visit the Skills section and navigate to "Recommended Learning."</li>
                      <li>Browse recommendations filtered by skill category, difficulty level, or time commitment.</li>
                      <li>Each recommendation includes:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Course or resource name</li>
                          <li>Provider information</li>
                          <li>Cost (including free options)</li>
                          <li>Estimated completion time</li>
                          <li>User ratings and reviews</li>
                          <li>Skills covered</li>
                        </ul>
                      </li>
                      <li>Add selected resources to your learning plan.</li>
                      <li>Track your progress as you complete courses or training.</li>
                      <li>Upload certificates of completion to validate your new skills.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Many recommended resources include special discounts for SkillSync users. Look for the "Discount Available" tag when browsing learning options.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Documents Section */}
            <TabsContent value="documents" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Documents & Portfolio</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="document-types">
                  <AccordionTrigger>What types of documents should I upload?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync can store and analyze various career-related documents to enhance your profile:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Resumes & CVs:</strong> Current and past versions</li>
                      <li><strong>Performance Reviews:</strong> Annual or quarterly assessments from employers</li>
                      <li><strong>Certificates & Diplomas:</strong> Educational and professional certifications</li>
                      <li><strong>Transcripts:</strong> Academic records showing courses and grades</li>
                      <li><strong>Job Descriptions:</strong> Detailed descriptions of your current and past roles</li>
                      <li><strong>Recommendation Letters:</strong> Professional recommendations and references</li>
                      <li><strong>Project Portfolios:</strong> Examples of your work and accomplishments</li>
                      <li><strong>Awards & Recognition:</strong> Documentation of professional achievements</li>
                      <li><strong>Skills Assessments:</strong> Results from skills tests or evaluations</li>
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground">For optimal results, upload documents in PDF format when possible, as this preserves formatting and enables better text extraction for analysis.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="document-organization">
                  <AccordionTrigger>How should I organize my documents?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Proper document organization helps you quickly find what you need and allows SkillSync to provide better insights:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Use the document type categorization when uploading (resume, certificate, performance review, etc.).</li>
                      <li>Add relevant tags to each document for easier filtering.</li>
                      <li>Include dates for all documents to maintain a chronological record.</li>
                      <li>Create custom folders for organizing documents by employer, time period, or purpose.</li>
                      <li>Use descriptive filenames before uploading for easier identification.</li>
                      <li>Add notes to documents with context or explanations when needed.</li>
                    </ol>
                    <p className="mt-2">The Documents dashboard provides various sorting and filtering options to help you navigate your collection. Use the search function to quickly locate specific documents by keyword.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="auto-resume-creation">
                  <AccordionTrigger>How does the automatic resume creation work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync can automatically generate tailored resumes for specific job applications:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>When you find a job you want to apply for, click "Create Custom Resume."</li>
                      <li>SkillSync analyzes the job description to identify key requirements and desired qualifications.</li>
                      <li>The system matches these requirements with your skills, experiences, and achievements.</li>
                      <li>A custom resume is generated that highlights the most relevant aspects of your profile for that specific position.</li>
                      <li>You can review and edit the resume before finalizing it.</li>
                      <li>Choose from different design templates to match the company's culture or industry standards.</li>
                      <li>Save the custom resume to your documents or download it in various formats (PDF, Word, etc.).</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">For best results, ensure your skills and experience details are comprehensive and up-to-date in your profile before generating custom resumes.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="portfolio-building">
                  <AccordionTrigger>How do I build a professional portfolio?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">A portfolio showcases your work and achievements in a visual, impactful way:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Navigate to the Portfolio section within Documents.</li>
                      <li>Click "Create New Portfolio Item" to add a project or work sample.</li>
                      <li>For each portfolio item, include:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Project title and description</li>
                          <li>Your role and contributions</li>
                          <li>Technologies or methodologies used</li>
                          <li>Visual elements (images, videos, presentations)</li>
                          <li>Outcomes and results achieved</li>
                          <li>Links to live projects (if applicable)</li>
                        </ul>
                      </li>
                      <li>Organize portfolio items by category, chronology, or relevance.</li>
                      <li>Set privacy levels for each item (public, private, or share via link).</li>
                      <li>Generate a public portfolio URL to share with potential employers.</li>
                    </ol>
                    <p className="mt-2">Your portfolio is automatically included in your custom resumes when relevant to the position. You can also generate a standalone portfolio website with your selected items.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Jobs Section */}
            <TabsContent value="jobs" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Job Recommendations & Applications</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="job-recommendations">
                  <AccordionTrigger>How are job recommendations generated?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync uses advanced AI matching to find jobs that align with your skills, experience, and career goals:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Our system analyzes your complete profile, including skills, experience, education, and career preferences.</li>
                      <li>We scan thousands of job listings across multiple sources in real-time.</li>
                      <li>Each potential match is scored based on:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Skill match percentage</li>
                          <li>Experience alignment</li>
                          <li>Salary expectations</li>
                          <li>Location preferences</li>
                          <li>Industry and company fit</li>
                          <li>Career trajectory potential</li>
                        </ul>
                      </li>
                      <li>Jobs are presented in order of match quality, with key matching factors highlighted.</li>
                      <li>You can fine-tune recommendations by adjusting your job preferences and career goals.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Job recommendations refresh daily, so check back regularly for new opportunities. You'll also receive email alerts for high-quality matches if you've enabled notifications.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="application-process">
                  <AccordionTrigger>How does the automatic job application process work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync streamlines the job application process to save you time and effort:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>When you find a job you want to apply for, click "Apply Now."</li>
                      <li>SkillSync generates a custom resume optimized for this specific position.</li>
                      <li>You can review and edit the resume before proceeding.</li>
                      <li>The system prepares a personalized cover letter based on the job requirements and your relevant experience.</li>
                      <li>You can review and edit the cover letter as needed.</li>
                      <li>For standard online applications, SkillSync can automatically fill out application forms using your profile data.</li>
                      <li>For direct applications, the system sends your documents via email with a professional message.</li>
                      <li>After applying, the job moves to your "Applications" dashboard for tracking.</li>
                    </ol>
                    <p className="mt-2">You maintain control throughout the process. Nothing is submitted without your review and approval, and you can customize your application materials for each position.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="application-tracking">
                  <AccordionTrigger>How do I track my job applications?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync provides comprehensive tracking of all your job applications:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>All applications are automatically added to your "Applications" dashboard.</li>
                      <li>Each application displays:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Company and position details</li>
                          <li>Application date</li>
                          <li>Current status</li>
                          <li>Documents submitted (resume, cover letter, etc.)</li>
                          <li>Any communication history</li>
                          <li>Next steps and reminders</li>
                        </ul>
                      </li>
                      <li>Update the status manually or connect your email to receive automatic updates.</li>
                      <li>Set reminders for follow-ups or interview preparation.</li>
                      <li>Add notes about interactions, impressions, or questions.</li>
                      <li>Compare offers with the salary comparison tool when you reach that stage.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">SkillSync can monitor your email (with permission) to automatically detect responses from employers and update application statuses accordingly.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="email-integration">
                  <AccordionTrigger>How does email integration work for job tracking?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Email integration enhances your job application tracking experience:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to Settings and select "Connect Email Account."</li>
                      <li>Choose your email provider and grant SkillSync limited access to scan for job-related emails.</li>
                      <li>SkillSync identifies emails from employers, recruiters, and job boards.</li>
                      <li>The system automatically:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Updates application statuses based on responses</li>
                          <li>Adds interview invitations to your calendar</li>
                          <li>Alerts you to time-sensitive communications</li>
                          <li>Categorizes and organizes job-related emails</li>
                        </ul>
                      </li>
                      <li>View all communication related to a specific application in one place.</li>
                      <li>Get reminders to follow up when an appropriate time has passed with no response.</li>
                    </ol>
                    <p className="mt-2">SkillSync uses secure protocols and limited access permissions. We only scan for job-related emails and never read personal communications. You can disconnect email integration at any time.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Salary Section */}
            <TabsContent value="salary" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Salary Insights & Negotiation</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="salary-data">
                  <AccordionTrigger>How accurate is the salary data?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync provides highly accurate salary information from multiple sources:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Data Sources:</strong> Our salary data comes from a combination of:
                        <ul className="list-circle pl-5 mt-1">
                          <li>Government labor statistics</li>
                          <li>Aggregated job posting information</li>
                          <li>Anonymized user-reported salaries</li>
                          <li>Partnerships with compensation research firms</li>
                          <li>Company-reported salary ranges (where available)</li>
                        </ul>
                      </li>
                      <li><strong>Freshness:</strong> Salary data is updated monthly to reflect current market conditions.</li>
                      <li><strong>Specificity:</strong> Salaries are broken down by:
                        <ul className="list-circle pl-5 mt-1">
                          <li>Job title and specialization</li>
                          <li>Experience level</li>
                          <li>Industry</li>
                          <li>Company size</li>
                          <li>Geographic location (with cost-of-living adjustments)</li>
                          <li>Required skills and certifications</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground">While we strive for maximum accuracy, salary data should be used as a guideline rather than an absolute. Individual compensation may vary based on factors not captured in our data models.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="salary-calculator">
                  <AccordionTrigger>How do I use the salary calculator?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">The salary calculator helps you determine your market value and appropriate compensation targets:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Navigate to the Salary section and select "Salary Calculator."</li>
                      <li>Select a job title that matches your current or target role.</li>
                      <li>Specify your years of experience and education level.</li>
                      <li>Select your location or target job market.</li>
                      <li>Add relevant skills, certifications, or specializations.</li>
                      <li>Choose your industry and company size preference.</li>
                      <li>The calculator will show:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Salary range (10th to 90th percentile)</li>
                          <li>Median salary</li>
                          <li>Bonus and benefits information</li>
                          <li>How each factor affects your compensation</li>
                          <li>Comparison to similar roles</li>
                        </ul>
                      </li>
                    </ol>
                    <p className="mt-2">Use the "What If" scenario analysis to see how acquiring specific skills or certifications could increase your earning potential, or how compensation varies across different locations.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="negotiation-coaching">
                  <AccordionTrigger>How can I prepare for salary negotiations?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync offers comprehensive negotiation preparation tools:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>In the Salary section, select "Negotiation Coach."</li>
                      <li>Input details about the position and any offer you've received.</li>
                      <li>The system provides:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Analysis of the offer compared to market rates</li>
                          <li>Suggested negotiation range based on your qualifications</li>
                          <li>Key talking points highlighting your value</li>
                          <li>Scripts for common negotiation scenarios</li>
                          <li>Advice on non-salary benefits to negotiate</li>
                        </ul>
                      </li>
                      <li>Practice with the AI-powered negotiation simulator.</li>
                      <li>Access expert-created negotiation templates and email examples.</li>
                      <li>Review industry-specific negotiation strategies and tips.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">For premium users, one-on-one coaching sessions with professional salary negotiation experts are available for high-stakes negotiations.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="compare-offers">
                  <AccordionTrigger>How do I compare multiple job offers?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync's offer comparison tool helps you evaluate competing opportunities holistically:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to the Applications section and select "Compare Offers."</li>
                      <li>Select the offers you want to compare.</li>
                      <li>For each offer, enter:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Base salary and bonus structure</li>
                          <li>Equity or stock options</li>
                          <li>Benefits package details</li>
                          <li>Retirement contributions</li>
                          <li>Vacation and time-off policies</li>
                          <li>Remote work or flexibility options</li>
                          <li>Commute time and expenses</li>
                          <li>Growth and advancement opportunities</li>
                        </ul>
                      </li>
                      <li>The comparison tool will calculate:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Total compensation value</li>
                          <li>Adjusted after-tax income</li>
                          <li>Cost-of-living adjusted value</li>
                          <li>Five-year projected earnings</li>
                          <li>Work-life balance score</li>
                          <li>Career growth potential score</li>
                        </ul>
                      </li>
                    </ol>
                    <p className="mt-2">The tool also provides a side-by-side visualization of all factors and a weighted decision matrix based on your personal priorities.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Coaching Section */}
            <TabsContent value="coaching" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">AI Career Coaching</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="daily-tips">
                  <AccordionTrigger>How do the daily career tips work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync provides personalized daily career tips to help you continually develop:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Personalization:</strong> Each tip is tailored to your:
                        <ul className="list-circle pl-5 mt-1">
                          <li>Current career stage</li>
                          <li>Identified skill gaps</li>
                          <li>Industry trends</li>
                          <li>Career goals</li>
                          <li>Past behavior and engagement patterns</li>
                        </ul>
                      </li>
                      <li><strong>Delivery:</strong> Tips are delivered daily via:
                        <ul className="list-circle pl-5 mt-1">
                          <li>Dashboard notification</li>
                          <li>Email (if enabled)</li>
                          <li>Mobile app push notification (if app is installed)</li>
                        </ul>
                      </li>
                      <li><strong>Content:</strong> Tips cover diverse career development areas:
                        <ul className="list-circle pl-5 mt-1">
                          <li>Technical and hard skills</li>
                          <li>Soft skills and leadership</li>
                          <li>Networking strategies</li>
                          <li>Industry knowledge</li>
                          <li>Productivity and work habits</li>
                          <li>Career visibility and personal branding</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="mt-2">You can save valuable tips to your personal career development plan and set reminders to implement specific advice. The system tracks which tips you engage with to further refine future recommendations.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="career-plan">
                  <AccordionTrigger>How do I create a career development plan?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync helps you build a structured career development plan:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Navigate to the Coaching section and select "Career Plan."</li>
                      <li>Define your long-term career goals and target roles.</li>
                      <li>The system will suggest a customized development roadmap including:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Skills to develop in priority order</li>
                          <li>Educational opportunities and certifications</li>
                          <li>Experience milestones to achieve</li>
                          <li>Networking and visibility actions</li>
                          <li>Suggested timeline for each development area</li>
                        </ul>
                      </li>
                      <li>Customize the plan by adjusting priorities and timelines.</li>
                      <li>Break down long-term goals into quarterly and monthly objectives.</li>
                      <li>Set up progress tracking and milestone reminders.</li>
                      <li>Schedule regular plan reviews and adjustments.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">Your career plan integrates with the Skills and Learning sections, automatically suggesting specific resources to help you achieve each development goal.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="leadership-development">
                  <AccordionTrigger>How can I develop leadership skills?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">SkillSync offers comprehensive leadership development resources:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>In the Coaching section, select "Leadership Development."</li>
                      <li>Complete the leadership assessment to identify your strengths and growth areas.</li>
                      <li>Receive a personalized leadership development plan covering:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Communication and influence</li>
                          <li>Strategic thinking</li>
                          <li>Team building and management</li>
                          <li>Decision making and problem solving</li>
                          <li>Emotional intelligence</li>
                          <li>Change management</li>
                          <li>Conflict resolution</li>
                        </ul>
                      </li>
                      <li>Access curated leadership resources including articles, videos, and exercises.</li>
                      <li>Practice with interactive leadership scenario simulations.</li>
                      <li>Track your progress with periodic reassessments.</li>
                      <li>Connect with leadership mentors or coaching networks (premium feature).</li>
                    </ol>
                    <p className="mt-2">Leadership development is integrated with your career plan and skill development tracking, helping you build a well-rounded leadership profile aligned with your career goals.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="soft-skills">
                  <AccordionTrigger>How can I improve my soft skills?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Soft skills are critical for career advancement. SkillSync helps you develop them systematically:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Go to the Skills section and select the "Soft Skills" category.</li>
                      <li>Take the comprehensive soft skills assessment to establish your baseline.</li>
                      <li>Based on your assessment and career goals, get personalized development paths for key soft skills:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Communication (written, verbal, presentation)</li>
                          <li>Collaboration and teamwork</li>
                          <li>Adaptability and resilience</li>
                          <li>Creativity and innovation</li>
                          <li>Critical thinking and problem-solving</li>
                          <li>Time management and organization</li>
                          <li>Emotional intelligence and empathy</li>
                          <li>Negotiation and conflict resolution</li>
                        </ul>
                      </li>
                      <li>Access micro-learning exercises designed to be practiced daily.</li>
                      <li>Use interactive simulations to practice difficult workplace scenarios.</li>
                      <li>Receive specific prompts to apply soft skills in your current role.</li>
                      <li>Track your progress through periodic self-assessments and reflection exercises.</li>
                    </ol>
                    <p className="mt-2 text-sm text-muted-foreground">For optimal results, focus on developing 1-2 soft skills at a time, with consistent daily practice rather than occasional intensive efforts.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">Our support team is available to assist you with any questions you might have about using SkillSync.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Contact Support
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
                  Schedule a Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Help;
