import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes"; // Ensure this import path is correct based on your setup
import { type InsertContactMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

// Fetch Projects
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      // Use the path from api definition
      const res = await fetch('/api/projects'); 
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json() as Project[];
    },
    // Mock data if backend is empty/failing for demo purposes
    initialData: [
      {
        id: 1,
        title: "Sales Performance Analysis using Excel",
        description: "End-to-end Excel analysis project covering sales trends, product performance, country-wise contribution, order completion status, and deal size impact through pivot-driven dashboarding.",
        technologies: ["Microsoft Excel", "Pivot Tables", "Excel Charts"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        link: "#"
      },
      {
        id: 2,
        title: "SQL E-commerce Sales Analysis",
        description: "SQL (MySQL) analysis of a Kaggle e-commerce sales dataset covering performance, category trends, payment usage, discount impact, and customer purchase behavior.",
        technologies: ["MySQL", "SQL", "CSV"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        link: "#"
      },
      {
        id: 3,
        title: "Flipkart Product Data Analysis using Excel",
        description: "Excel-driven analysis of Flipkart product data to evaluate customer behavior, pricing strategy, discount effects, and high-performing product categories.",
        technologies: ["Microsoft Excel", "Pivot Tables", "Dashboard Design"],
        imageUrl: "https://images.unsplash.com/photo-1543286386-713df548e9cc?w=800&q=80",
        link: "#"
      }
    ]
  });
}

// Fetch Skills
export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async (): Promise<Skill[]> => {
      const res = await fetch('/api/skills');
      if (!res.ok) throw new Error("Failed to fetch skills");
      return await res.json() as Skill[];
    },
    // Mock data ensures the UI looks good immediately
    initialData: [
      { id: 1, name: "MySQL", icon: "SiMysql", category: "Database", proficiency: 95 },
      { id: 2, name: "Power BI", icon: "SiPowerbi", category: "Visualization", proficiency: 90 },
      { id: 3, name: "Excel", icon: "SiMicrosoftexcel", category: "Analysis", proficiency: 98 },
      { id: 4, name: "Python", icon: "SiPython", category: "Scripting", proficiency: 85 },
      { id: 5, name: "Tableau", icon: "SiTableau", category: "Visualization", proficiency: 80 },
      { id: 6, name: "R", icon: "SiR", category: "Statistics", proficiency: 75 },
    ]
  });
}

// Contact Form Mutation
export function useContactMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        if (isJson && typeof payload === "object" && payload && "message" in payload) {
          throw new Error(String((payload as { message?: string }).message || "Failed to send message"));
        }

        if (typeof payload === "string" && payload.trim().startsWith("<")) {
          throw new Error("Contact API is not available on the live site yet. Deploy backend /api/contact.");
        }

        throw new Error("Failed to send message");
      }

      if (!isJson) {
        throw new Error("Invalid server response from contact API");
      }

      return payload;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
