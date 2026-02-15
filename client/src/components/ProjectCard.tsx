import { useEffect, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FileText, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  index: number;
  details?: {
    overview: string;
    workflow: string;
    tools: string[];
    questions: string[];
    insights: string[];
    conclusion: string;
  };
}

const GITHUB_PROFILE_URL = "https://github.com/divyansh-data-analyst";

export function ProjectCard({ title, description, technologies, link, githubLink, index, details }: ProjectCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const resetTilt = () => {
    pointerX.jump(0);
    pointerY.jump(0);
  };

  useEffect(() => {
    if (isDetailsOpen) {
      resetTilt();
    }
  }, [isDetailsOpen]);

  const questions = details?.questions ?? ["What business outcome can be improved with this analysis?"];
  const insights = details?.insights ?? [description];
  const questionSplit = Math.ceil(questions.length / 2);
  const insightSplit = Math.ceil(insights.length / 2);
  const leftQuestions = questions.slice(0, questionSplit);
  const rightQuestions = questions.slice(questionSplit);
  const leftInsights = insights.slice(0, insightSplit);
  const rightInsights = insights.slice(insightSplit);

  return (
    <motion.div
      onMouseMove={(e) => {
        if (isDetailsOpen) return;
        handleMouseMove(e);
      }}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/35 bg-card/24 p-6 shadow-[0_12px_28px_hsl(0_0%_0%/0.18),0_0_0_1px_hsl(var(--primary)/0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_18px_36px_hsl(0_0%_0%/0.24),0_0_0_1px_hsl(var(--primary)/0.16)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-65" />
      <div className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-primary/12 blur-3xl opacity-30 transition-opacity duration-300 group-hover:opacity-45" />
      <div className="relative flex-1 [transform:translateZ(26px)]">
        <h3 className="mb-3 text-[1.08rem] font-bold font-display tracking-[0.01em] text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full border border-border/50 bg-card/30 px-2.5 py-0.5 text-[10px] font-medium text-foreground/90">
              {tech}
            </Badge>
          ))}
        </div>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/78">
          {description}
        </p>
      </div>

      <div className="relative mt-auto flex gap-2 [transform:translateZ(34px)]">
        <Dialog
          open={isDetailsOpen}
          onOpenChange={(open) => {
            setIsDetailsOpen(open);
            if (!open) resetTilt();
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="!h-7 !min-h-7 flex-1 gap-1 rounded-full border border-border/50 bg-card/28 px-2.5 text-[10px] font-semibold leading-none text-foreground transition-colors hover:border-primary/40 hover:bg-card/40"
            >
              <FileText className="h-2.5 w-2.5" /> Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[82vh] max-w-4xl overflow-hidden border border-border/70 bg-slate-950/95 p-0 text-slate-100 backdrop-blur-xl">
            <ScrollArea className="max-h-[82vh]">
              <div className="space-y-4 p-4 md:p-5">
                <DialogHeader className="space-y-2 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Project Brief
                  </p>
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <DialogTitle className="text-xl font-bold leading-tight text-white">{title}</DialogTitle>
                    <div className="flex max-w-[55%] flex-wrap justify-start gap-1 md:justify-end">
                      {(details?.tools ?? technologies).map((tool) => (
                        <span key={tool} className="rounded-full border border-border/70 bg-background/30 px-2 py-0.5 text-[10px] font-medium text-slate-100">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <DialogDescription className="text-sm text-slate-300">{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 border-t border-border/60 pt-3 md:grid-cols-2 md:items-stretch">
                  <div className="flex h-full flex-col gap-4">
                    <section className="flex-1 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Overview</p>
                      <p className="text-sm text-slate-100">{details?.overview ?? description}</p>
                    </section>

                    <section className="flex-1 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Business Questions Answered</p>
                      <div className="space-y-2">
                        {leftQuestions.map((question) => (
                          <p key={question} className="text-sm leading-relaxed text-slate-100">
                            <span className="mr-2 text-slate-300">-</span>
                            {question}
                          </p>
                        ))}
                      </div>
                    </section>

                    <section className="flex-1 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Key Insights</p>
                      <div className="space-y-2">
                        {leftInsights.map((insight) => (
                          <p key={insight} className="text-sm leading-relaxed text-slate-100">
                            <span className="mr-2 text-slate-300">-</span>
                            {insight}
                          </p>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="flex h-full flex-col gap-4 md:border-l md:border-border/60 md:pl-5">
                    <section className="flex-1 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Workflow</p>
                      <p className="text-sm text-slate-100">
                        {details?.workflow ?? "Data extraction, analysis, and storytelling with actionable outputs."}
                      </p>
                    </section>

                    {rightQuestions.length > 0 ? (
                      <section className="flex-1 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Additional Business Questions</p>
                        <div className="space-y-2">
                          {rightQuestions.map((question) => (
                            <p key={question} className="text-sm leading-relaxed text-slate-100">
                              <span className="mr-2 text-slate-300">-</span>
                              {question}
                            </p>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {rightInsights.length > 0 ? (
                      <section className="flex-1 space-y-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Additional Insights</p>
                        <div className="space-y-2">
                          {rightInsights.map((insight) => (
                            <p key={insight} className="text-sm leading-relaxed text-slate-100">
                              <span className="mr-2 text-slate-300">-</span>
                              {insight}
                            </p>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    <section className="flex-1 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Conclusion</p>
                      <p className="text-sm text-slate-100">
                        {details?.conclusion ?? "This project translates data into clear actions for faster, better decisions."}
                      </p>
                    </section>
                  </div>
                </div>

                {link && link !== "#" ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-2 rounded-full border border-border/70 bg-background/30 px-3 text-xs font-semibold text-slate-100 transition-colors hover:bg-background/45"
                  >
                    Open Project Link
                  </a>
                ) : null}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          size="sm"
          className="!h-7 !min-h-7 flex-1 gap-1 rounded-full border border-border/50 bg-card/28 px-2.5 text-[10px] font-semibold leading-none text-foreground transition-colors hover:border-primary/40 hover:bg-card/40"
          asChild
        >
          <a href={githubLink || GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
            <Github className="h-2.5 w-2.5" /> Github
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
