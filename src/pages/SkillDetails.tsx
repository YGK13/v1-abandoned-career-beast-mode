
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  ExternalLink, 
  ShoppingCart,
  Award,
  Clock,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  provider: string;
  level: string;
  duration: string;
  price: string;
  rating: number;
  url: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  price: string;
  imageUrl: string;
  url: string;
}

const CourseCard = ({ course }: { course: Course }) => (
  <DashboardCard className="h-full">
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-2">
        <div>
          <Badge variant="outline" className="mb-2">{course.provider}</Badge>
          <h3 className="font-semibold">{course.title}</h3>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {course.price}
        </Badge>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <Award className="w-4 h-4 mr-2 text-muted-foreground" />
          <span>{course.level}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center text-sm">
          <Star className="w-4 h-4 mr-2 text-yellow-400" />
          <span>{course.rating}/5 rating</span>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => window.open(course.url, '_blank')}
        >
          View Course
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
        >
          Purchase
          <ShoppingCart className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  </DashboardCard>
);

const BookCard = ({ book }: { book: Book }) => (
  <div className="flex border rounded-lg overflow-hidden h-full">
    <div className="w-1/3 bg-muted flex items-center justify-center p-4">
      <div className="h-36 w-24 rounded bg-muted-foreground/20 flex items-center justify-center overflow-hidden">
        <BookOpen className="h-8 w-8 text-muted-foreground" />
      </div>
    </div>
    <div className="w-2/3 p-4 flex flex-col">
      <h3 className="font-medium mb-1">{book.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
      
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: Math.floor(book.rating) }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {book.rating % 1 !== 0 && (
          <Star className="h-4 w-4 text-yellow-400" />
        )}
        {Array.from({ length: 5 - Math.ceil(book.rating) }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-muted" />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{book.rating}</span>
      </div>
      
      <Badge variant="outline" className="w-fit mb-auto">{book.price}</Badge>
      
      <div className="mt-4 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => window.open(book.url, '_blank')}
        >
          View on Amazon
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
        >
          Purchase
          <ShoppingCart className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  </div>
);

const SkillDetails = () => {
  const { skillName } = useParams<{ skillName: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // This would be fetched from an API in a real application
  const skillData = {
    name: skillName || "Unknown Skill",
    level: 72,
    category: "Technical",
    trend: "up" as const,
    isInDemand: true,
    description: "This skill is highly valued in today's job market, particularly in technology and data-driven industries. Mastering this skill can significantly boost your earning potential and career opportunities.",
    relatedSkills: ["Data Science", "Python", "Spreadsheets", "Visualization", "SQL"],
    courses: [
      {
        id: "c1",
        title: `Complete ${skillName} Bootcamp 2023`,
        provider: "Udemy",
        level: "Beginner to Advanced",
        duration: "20 hours",
        price: "$94.99",
        rating: 4.7,
        url: "https://www.udemy.com"
      },
      {
        id: "c2",
        title: `Professional ${skillName} Certification`,
        provider: "Coursera",
        level: "Intermediate",
        duration: "3 months",
        price: "$49/month",
        rating: 4.5,
        url: "https://www.coursera.org"
      },
      {
        id: "c3",
        title: `${skillName} for Business Professionals`,
        provider: "LinkedIn Learning",
        level: "Beginner",
        duration: "8 hours",
        price: "$29.99",
        rating: 4.2,
        url: "https://www.linkedin.com/learning"
      }
    ],
    books: [
      {
        id: "b1",
        title: `${skillName}: A Comprehensive Guide`,
        author: "John Smith",
        rating: 4.6,
        price: "$34.99",
        imageUrl: "",
        url: "https://www.amazon.com"
      },
      {
        id: "b2",
        title: `Mastering ${skillName} in 30 Days`,
        author: "Sarah Johnson",
        rating: 4.8,
        price: "$29.95",
        imageUrl: "",
        url: "https://www.amazon.com"
      },
      {
        id: "b3",
        title: `${skillName} for Professionals`,
        author: "Michael Brown",
        rating: 4.3,
        price: "$39.99",
        imageUrl: "",
        url: "https://www.amazon.com"
      }
    ]
  };
  
  const handlePurchase = () => {
    toast({
      title: "Purchase Started",
      description: "Your purchase is being processed. Your profile will be updated upon completion.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Skills
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">{skillData.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{skillData.category}</Badge>
                {skillData.isInDemand && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300">
                    In High Demand
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Growing Field
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard className="md:col-span-2">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Skill Overview</h2>
              <p className="text-muted-foreground mb-6">
                {skillData.description}
              </p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Your Proficiency</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current Level: Intermediate</span>
                  <span className="text-muted-foreground">{skillData.level}%</span>
                </div>
                <Progress value={skillData.level} className="h-2 mb-4" />
                
                <div className="grid grid-cols-5 gap-1 text-center text-xs">
                  <div className={`p-1 rounded ${skillData.level < 20 ? 'bg-primary/10 text-primary' : ''}`}>Beginner</div>
                  <div className={`p-1 rounded ${skillData.level >= 20 && skillData.level < 40 ? 'bg-primary/10 text-primary' : ''}`}>Basic</div>
                  <div className={`p-1 rounded ${skillData.level >= 40 && skillData.level < 60 ? 'bg-primary/10 text-primary' : ''}`}>Intermediate</div>
                  <div className={`p-1 rounded ${skillData.level >= 60 && skillData.level < 80 ? 'bg-primary/10 text-primary' : ''}`}>Advanced</div>
                  <div className={`p-1 rounded ${skillData.level >= 80 ? 'bg-primary/10 text-primary' : ''}`}>Expert</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Related Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillData.relatedSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => navigate(`/skills/${encodeURIComponent(skill.toLowerCase())}`)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Skill Improvement</h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-3 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Courses Available</h3>
                    <p className="text-xs text-muted-foreground">3 recommended courses</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-muted p-3 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Books Available</h3>
                    <p className="text-xs text-muted-foreground">3 recommended books</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-medium">Profile Updates</h3>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your profile will be automatically updated with your progress as you complete courses and read books.
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <Tabs defaultValue="courses" className="w-full mb-8">
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
            <TabsTrigger value="books">Recommended Books</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skillData.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="books" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillData.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SkillDetails;
