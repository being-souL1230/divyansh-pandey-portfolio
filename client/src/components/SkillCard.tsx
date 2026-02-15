import { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";

// Map icon strings to actual components
const siIconRecord = SiIcons as Record<string, IconType | undefined>;
const IconMap: Record<string, IconType> = {
  SiMysql: siIconRecord["SiMysql"] || SiIcons.SiDatabricks,
  SiPowerbi: siIconRecord["SiPowerbi"] || SiIcons.SiDatabricks,
  SiMicrosoftexcel: siIconRecord["SiMicrosoftexcel"] || SiIcons.SiDatabricks,
  SiPython: siIconRecord["SiPython"] || SiIcons.SiDatabricks,
  SiTableau: siIconRecord["SiTableau"] || SiIcons.SiDatabricks,
};

interface SkillCardProps {
  name: string;
  icon: string;
  category: string;
  delay: number;
}

export function SkillCard({ name, icon, category }: SkillCardProps) {
  const IconComponent = IconMap[icon] || SiIcons.SiDatabricks;

  // Define brand colors for known tools
  const getBrandColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "mysql": return "text-[#4479A1]";
      case "power bi": return "text-[#F2C811]";
      case "excel": return "text-[#217346]";
      case "python": return "text-[#3776AB]";
      case "tableau": return "text-[#E97627]";
      default: return "text-primary";
    }
  };

  return (
    <div className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-card p-3 text-center shadow-sm transition-colors hover:border-primary/20">
      <div className={`mb-2 rounded-xl bg-muted/50 p-2.5 ${getBrandColor(name)}`}>
        <IconComponent className="h-7 w-7" />
      </div>

      <div className="relative z-10">
        <h3 className="font-display text-sm font-bold leading-tight">{name}</h3>
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{category}</p>
      </div>
    </div>
  );
}
