import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { useProjects, useSkills } from "@/hooks/use-data-analyst";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";
import {
  ChevronDown,
  Download,
  Linkedin,
  Mail,
  BarChart3,
  Database,
  UserRound,
  BrainCircuit,
  Workflow,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll";
import profileImage from "@/assets/divyansh_profile.png";
import resumePdf from "@/assets/DIVYANSH_PANDEY_RESUME.pdf";

const GITHUB_PROFILE_URL = "https://github.com/divyansh-data-analyst";
const EXCEL_PROJECT_GITHUB_URL = "https://github.com/divyansh-data-analyst/excel-sales-analysis";
const SQL_PROJECT_GITHUB_URL = "https://github.com/divyansh-data-analyst/SQL-Ecommerce-Analysis";
const FLIPKART_PROJECT_GITHUB_URL = "https://github.com/divyansh-data-analyst/Flipkart-Excel-Data-Analysis";
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/divyansh-pandey-ba2a0228b/";
const SALES_EXCEL_PROJECT_DETAILS = {
  overview:
    "This project analyzes sales performance data in Microsoft Excel to identify trends, compare product performance, evaluate country-wise sales contribution, and assess order completion quality.",
  workflow:
    "End-to-end workflow: data cleaning, pivot table analysis, insight extraction, and dashboard creation.",
  tools: ["Microsoft Excel", "Pivot Tables", "Excel Charts", "Dashboard Design"],
  questions: [
    "What is the total sales and total number of orders?",
    "Which year recorded the highest total sales?",
    "How do sales trends vary across different years?",
    "Which countries contribute the most to total sales?",
    "Which product lines generate the highest revenue?",
    "How does deal size impact total sales?",
    "What percentage of orders are completed?",
  ],
  insights: [
    "Medium-sized deals generate the highest total revenue.",
    "Order completion rate is approximately 92%, indicating strong operational efficiency.",
    "Sales are concentrated in a few key countries.",
    "Certain product lines consistently outperform others.",
    "Sales patterns vary across years, showing clear trends.",
  ],
  conclusion:
    "This project demonstrates practical Excel analysis capability from raw-data cleaning to dashboard storytelling for real business decisions.",
};
const SQL_ECOMMERCE_PROJECT_DETAILS = {
  overview:
    "This project analyzes an e-commerce sales dataset using SQL (MySQL) to answer business questions around revenue, categories, discounts, payment behavior, and customer buying patterns.",
  workflow:
    "CSV import, schema setup, SQL querying, metric aggregation, trend slicing by date, and business insight extraction.",
  tools: ["MySQL", "SQL", "Kaggle CSV Dataset", "Query Optimization"],
  questions: [
    "What does the overall sales performance look like?",
    "Which categories perform best by revenue and order count?",
    "How are payment methods distributed across transactions?",
    "How do discounts affect final sales value?",
    "What are the major time-based sales trends?",
    "How does customer purchase behavior vary by user?",
    "Which records drive the highest-value transactions?",
  ],
  insights: [
    "SQL queries made it easy to break down sales by category and payment method.",
    "Discount vs final-price analysis highlighted margin-sensitive patterns.",
    "Time-based slicing exposed peak purchase windows and trend shifts.",
    "Customer-level aggregation identified repeat and high-value buyers.",
    "Key fields used: User_ID, Product_ID, Category, Price, Discount, Final_Price, Payment_Method, Purchase_Date.",
  ],
  conclusion:
    "This project demonstrates practical SQL analytics for converting transaction-level e-commerce data into clear business decisions.",
};
const FLIPKART_EXCEL_PROJECT_DETAILS = {
  overview:
    "This project analyzes Flipkart product data using Microsoft Excel to understand customer behavior, pricing strategy, discount effects, and category-level performance.",
  workflow:
    "End-to-end workflow: data cleaning, transformation, pivot table analysis, business question solving, and interactive dashboard creation.",
  tools: [
    "Microsoft Excel",
    "Pivot Tables",
    "Excel Formulas",
    "Dashboard Design",
  ],
  questions: [
    "How do product price ranges (Low, Medium, High) influence ratings?",
    "Do higher-priced products consistently receive better ratings?",
    "What are the average price and rating across categories?",
    "What impact do discounts have on customer ratings?",
    "Which products offer the best value for money?",
    "Do heavily discounted products indicate lower quality?",
    "Which product categories consistently achieve higher customer satisfaction?",
  ],
  insights: [
    "Medium-priced products receive the highest customer ratings.",
    "Higher prices do not guarantee better satisfaction.",
    "Discounts show minimal impact on customer ratings.",
    "Heavy discounts are not necessarily linked to poor quality.",
    "Certain categories consistently outperform others.",
    "Several products provide excellent value for money.",
  ],
  conclusion:
    "This project demonstrates practical Excel skills in data cleaning, pivot analysis, and dashboard creation to generate meaningful business insights from raw product data.",
};

const differentiators = [
  {
    title: "Actionable Insights",
    text: "I connect metrics to business actions, not just slide decks.",
  },
  {
    title: "End-to-End Delivery",
    text: "From SQL cleaning to dashboard storytelling in one workflow.",
  },
  {
    title: "Clear Communication",
    text: "Simple business communication that helps teams act faster.",
  },
];

const differentiatorStyles = [
  {
    number: "text-cyan-200",
    title: "text-cyan-200",
    chip: "bg-cyan-300/15 border-cyan-300/30 text-cyan-100",
  },
  {
    number: "text-emerald-200",
    title: "text-emerald-200",
    chip: "bg-emerald-300/15 border-emerald-300/30 text-emerald-100",
  },
  {
    number: "text-amber-200",
    title: "text-amber-200",
    chip: "bg-amber-300/15 border-amber-300/30 text-amber-100",
  },
];

const siIconRecord = SiIcons as Record<string, IconType | undefined>;

function getTechIcon(iconName: string): IconType {
  return siIconRecord[iconName] || SiIcons.SiDatabricks;
}

function getTechColor(name: string) {
  switch (name.toLowerCase()) {
    case "mysql":
      return "text-[#4AA3D8]";
    case "power bi":
      return "text-[#FFD64F]";
    case "excel":
      return "text-[#2BCB77]";
    case "python":
      return "text-[#7CC5FF]";
    case "tableau":
      return "text-[#FF9E5E]";
    case "sql server":
      return "text-[#67D4E8]";
    default:
      return "text-primary";
  }
}

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const visibleSkills = (skills ?? []).filter((skill) => skill.name !== "R");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans selection:bg-primary/20">
      <Navigation />

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-badge mb-6">Available for Analyst Roles</span>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                Transforming Raw Data
                <br />
                into <span className="text-gradient">Business Direction</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I build clear analytics systems using MySQL, Excel, and Power BI so teams can make faster and better decisions.
              </p>

              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <ScrollLink to="projects" smooth={true} offset={-100} duration={500}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="relative h-12 overflow-hidden rounded-full border border-white/35 bg-white/10 px-8 text-base text-foreground backdrop-blur-md transition-all before:absolute before:inset-y-0 before:left-[-130%] before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-all before:duration-700 hover:border-white/55 hover:bg-white/20 hover:before:left-[130%]"
                  >
                    View My Work
                  </Button>
                </ScrollLink>
                <ScrollLink to="contact" smooth={true} offset={-50} duration={500}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="relative h-12 overflow-hidden rounded-full border border-white/30 bg-white/8 px-8 text-base text-foreground backdrop-blur-md transition-all before:absolute before:inset-y-0 before:left-[-130%] before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-700 hover:border-white/50 hover:bg-white/18 hover:before:left-[130%]"
                  >
                    Book a Quick Call
                  </Button>
                </ScrollLink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative lg:-mt-20"
            >
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-2xl">
                <img
                  src={profileImage}
                  alt="Divyansh Pandey"
                  className="h-[440px] w-full scale-150 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6">
                  <p className="text-sm font-semibold text-primary">Data Analyst</p>
                  <p className="font-display text-2xl font-bold">Divyansh Pandey</p>
                </div>
              </div>

              <div className="absolute -left-6 top-12 hidden rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur md:block">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Database className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Data Layer</span>
                </div>
                <p className="text-sm font-semibold">MySQL + SQL Server</p>
              </div>

              <div className="absolute -right-6 bottom-10 hidden rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur md:block">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Reporting</span>
                </div>
                <p className="text-sm font-semibold">Power BI + Excel</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground md:block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      <section id="skills" className="relative py-16 md:py-18">
        <div className="pointer-events-none absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-6 right-10 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="section-badge mb-4">Technical Stack</span>
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Tools I Work With Daily</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Focused on extracting, analyzing, and visualizing data that teams can trust.
            </p>
          </div>

          {skillsLoading ? (
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-20 w-20 animate-pulse rounded-full border border-border/50 bg-muted/40" />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="mx-auto flex max-w-4xl flex-wrap items-start justify-center gap-x-6 gap-y-6 md:gap-x-7"
            >
              {visibleSkills.map((skill, index) => {
                const TechIcon = getTechIcon(skill.icon);
                const iconColor = getTechColor(skill.name);

                return (
                  <motion.article
                    key={skill.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="w-[96px] text-center"
                  >
                    <motion.div
                      whileHover={{ y: -5, scale: 1.07 }}
                      className="group relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-background/80 shadow-[0_8px_20px_hsl(0_0%_0%/0.28)]"
                    >
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
                      <TechIcon className={`relative z-10 h-7 w-7 ${iconColor}`} />
                    </motion.div>
                    <p className="mt-2 truncate text-[11px] font-semibold tracking-wide text-foreground/95">{skill.name}</p>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="relative my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent">
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-background" />
        </div>
      </div>

      <section id="projects" className="relative pt-8 pb-20">
        <div className="pointer-events-none absolute -left-24 top-12 h-52 w-52 rounded-full bg-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">
            <div className="max-w-xl">
              <span className="section-badge mb-4">Portfolio</span>
              <h2 className="text-3xl font-bold md:text-4xl">Selected Projects</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Interactive analytics builds designed to convert raw numbers into strategic decisions.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hidden h-9 rounded-full border border-border/60 bg-transparent px-5 text-xs font-bold text-foreground backdrop-blur-sm hover:bg-background/20"
              asChild
            >
              <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">View Github</a>
            </Button>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-4 hidden h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent lg:block" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectsLoading
                ? [1, 2, 3].map((i) => (
                    <div key={i} className="relative pt-6">
                      <span className="absolute left-1/2 top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-primary/40 bg-background lg:block" />
                      <div className="h-48 animate-pulse rounded-xl bg-muted" />
                    </div>
                  ))
                : projects?.map((project, index) => (
                    <div key={project.id} className="relative pt-6">
                      <span className="absolute left-1/2 top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-primary/55 bg-background shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] lg:block" />
                      <ProjectCard
                        {...project}
                        index={index}
                        githubLink={
                          index === 0
                            ? EXCEL_PROJECT_GITHUB_URL
                            : index === 1
                              ? SQL_PROJECT_GITHUB_URL
                            : index === 2
                              ? FLIPKART_PROJECT_GITHUB_URL
                              : undefined
                        }
                        details={
                          index === 0
                            ? SALES_EXCEL_PROJECT_DETAILS
                            : index === 1
                              ? SQL_ECOMMERCE_PROJECT_DETAILS
                              : index === 2
                                ? FLIPKART_EXCEL_PROJECT_DETAILS
                                : undefined
                        }
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative overflow-hidden py-14 text-foreground">
        <div className="absolute -left-24 top-2 h-60 w-60 rounded-full bg-accent/18 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-64 w-64 rounded-full bg-primary/16 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-border/60 bg-card/30 p-5 md:p-7">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-5">
              <div className="max-w-2xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary-foreground/25 bg-secondary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
                  <UserRound className="h-3.5 w-3.5" /> Why Hire Me
                </span>
                <h2 className="text-2xl font-bold md:text-3xl">What You Get Working With Me</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clear thinking, execution speed, and business-first reporting delivered in one workflow.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/25 px-4 py-2 text-right">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Delivery Mode</p>
                <p className="text-sm font-bold text-cyan-200">Insight to Action</p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative pl-11">
                <div className="absolute left-4 top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-primary/40 via-accent/40 to-transparent" />
                <div className="grid gap-5">
                  {differentiators.map((item, idx) => {
                    const icon = idx === 0 ? BrainCircuit : idx === 1 ? Workflow : MessageSquareText;
                    const Icon = icon;
                    return (
                      <div key={item.title} className="relative">
                        <div className="absolute -left-11 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/70">
                          <Icon className={`h-4 w-4 ${differentiatorStyles[idx].title}`} />
                        </div>
                        <h3 className={`text-base font-bold ${differentiatorStyles[idx].title}`}>{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/85">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex w-full justify-center lg:justify-end">
                <div className="w-full max-w-sm overflow-hidden rounded-xl border border-[#2d2d30] bg-[#1e1e1e] font-mono shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center gap-2 border-b border-[#2d2d30] bg-[#252526] px-4 py-2">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-[10px] text-[#cccccc]">impact_query.sql - Visual Studio Code</span>
                  </div>
                  <div className="px-4 py-4 text-xs leading-relaxed">
                    <span className="text-[#569cd6]">SELECT</span> <span className="text-[#d4d4d4]">insight</span>, <span className="text-[#d4d4d4]">impact</span> <br />
                    <span className="text-[#569cd6]">FROM</span> <span className="text-[#d4d4d4]">portfolio_projects</span> <br />
                    <span className="text-[#569cd6]">WHERE</span> <span className="text-[#d4d4d4]">candidate</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">'Divyansh'</span> <br />
                    <span className="text-[#569cd6]">ORDER BY</span> <span className="text-[#d4d4d4]">business_value</span> <span className="text-[#569cd6]">DESC</span>;
                  </div>
                  <div className="flex justify-between border-t border-[#2d2d30] px-4 py-3 text-[10px]">
                    <span className="text-[#9cdcfe]">3 strong matches</span>
                    <span className="text-[#4ec9b0]">0.01s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="relative my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent">
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-background" />
        </div>
      </div>

      <section id="contact" className="relative py-16">
        <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid items-start gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="section-badge mb-3">Get In Touch</span>
              <h2 className="mb-3 text-2xl font-bold md:text-4xl">Let's Build Something Useful</h2>
              <p className="mb-5 max-w-lg text-sm text-muted-foreground md:text-base">
                Need cleaner reports, better dashboards, or faster analysis cycles? Let's discuss your project scope.
              </p>

              <div className="max-w-lg">
                <a href="mailto:divyansh.pandey4564@gmail.com" className="group flex items-center gap-3 border-b border-border/60 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/25 text-primary">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Email</span>
                    <span className="block truncate text-sm font-semibold text-foreground/95 transition-colors group-hover:text-primary">
                      divyansh.pandey4564@gmail.com
                    </span>
                  </span>
                </a>

                <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/25 text-primary">
                    <Linkedin className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">LinkedIn</span>
                    <span className="block truncate text-sm font-semibold text-foreground/95 transition-colors group-hover:text-primary">
                      /in/divyanshpandey
                    </span>
                  </span>
                </a>
              </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="ghost"
                    className="relative h-10 overflow-hidden rounded-lg border border-white/30 bg-white/10 px-4 text-sm text-foreground backdrop-blur-md transition-all before:absolute before:inset-y-0 before:left-[-130%] before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-700 hover:border-white/50 hover:bg-white/18 hover:before:left-[130%]"
                    asChild
                  >
                    <a href={resumePdf} download="Divyansh_Pandey_Resume.pdf">
                      <Download className="h-4 w-4" /> Download Resume
                    </a>
                  </Button>
                  <ScrollLink to="projects" smooth={true} offset={-100} duration={500}>
                    <Button
                      variant="ghost"
                      className="relative h-10 overflow-hidden rounded-lg border border-white/30 bg-white/8 px-4 text-sm text-foreground backdrop-blur-md transition-all before:absolute before:inset-y-0 before:left-[-130%] before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-700 hover:border-white/50 hover:bg-white/18 hover:before:left-[130%]"
                    >
                      View Projects
                    </Button>
                  </ScrollLink>
                </div>
            </div>

            <div className="relative rounded-2xl border border-border/60 bg-card/55 p-4 shadow-[0_12px_28px_hsl(0_0%_0%/0.2)] backdrop-blur md:ml-auto md:w-full md:max-w-md md:p-5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-border/60 bg-muted/20 py-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <p className="font-display text-sm font-bold tracking-wide text-foreground/90">Divyansh Pandey</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Copyright {new Date().getFullYear()} Divyansh Pandey. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a href="#" className="rounded-full border border-border/60 bg-background/20 px-3 py-1 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/45 hover:text-primary">
                Twitter
              </a>
              <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noreferrer" className="rounded-full border border-border/60 bg-background/20 px-3 py-1 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/45 hover:text-primary">
                LinkedIn
              </a>
              <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer" className="rounded-full border border-border/60 bg-background/20 px-3 py-1 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/45 hover:text-primary">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
