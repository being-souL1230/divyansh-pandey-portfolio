import {
  type InsertContactMessage,
  type Project,
  type Skill,
  type ContactMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  seedData(): Promise<void>;
}

export class InMemoryStorage implements IStorage {
  private projectsData: Project[] = [];
  private skillsData: Skill[] = [];
  private contactMessagesData: ContactMessage[] = [];
  private nextProjectId = 1;
  private nextSkillId = 1;
  private nextContactMessageId = 1;

  async getProjects(): Promise<Project[]> {
    return this.projectsData;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skillsData;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: this.nextContactMessageId++,
      ...message,
    };
    this.contactMessagesData.push(newMessage);
    return newMessage;
  }

  async seedData(): Promise<void> {
    if (this.skillsData.length === 0) {
      const initialSkills: Omit<Skill, "id">[] = [
        { name: "MySQL", icon: "SiMysql", category: "Database", proficiency: 95 },
        { name: "PowerBI", icon: "SiPowerbi", category: "Visualization", proficiency: 90 },
        { name: "Excel", icon: "SiMicrosoftexcel", category: "Analysis", proficiency: 98 },
        { name: "Python", icon: "SiPython", category: "Analysis", proficiency: 85 },
        { name: "Tableau", icon: "SiTableau", category: "Visualization", proficiency: 80 },
        { name: "SQL Server", icon: "SiMicrosoftsqlserver", category: "Database", proficiency: 88 }
      ];

      this.skillsData = initialSkills.map((skill) => ({
        id: this.nextSkillId++,
        ...skill,
      }));
    }

    if (this.projectsData.length === 0) {
      const initialProjects: Omit<Project, "id">[] = [
        {
          title: "Sales Performance Analysis using Excel",
          description: "End-to-end Excel analysis project covering sales trends, product performance, country-wise contribution, order completion status, and deal size impact through pivot-driven dashboarding.",
          technologies: ["Microsoft Excel", "Pivot Tables", "Excel Charts"],
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
          link: "#",
        },
        {
          title: "SQL E-commerce Sales Analysis",
          description: "SQL (MySQL) analysis of a Kaggle e-commerce sales dataset covering performance, category trends, payment usage, discount impact, and customer purchase behavior.",
          technologies: ["MySQL", "SQL", "CSV"],
          imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
          link: "#",
        },
        {
          title: "Flipkart Product Data Analysis using Excel",
          description: "Excel-driven analysis of Flipkart product data to evaluate customer behavior, pricing strategy, discount effects, and high-performing product categories.",
          technologies: ["Microsoft Excel", "Pivot Tables", "Dashboard Design"],
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
          link: "#",
        },
      ];

      this.projectsData = initialProjects.map((project) => ({
        id: this.nextProjectId++,
        ...project,
      }));
    }
  }
}

export const storage = new InMemoryStorage();
