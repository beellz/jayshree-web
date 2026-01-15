import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIndustries } from "@/hooks/useIndustries";
import { useCompanies } from "@/hooks/useCompanies";
import logo from "@/assets/jayashri-logo.png";
import {
  Building2,
  Laptop,
  Fuel,
  Briefcase,
  HardHat,
  Shirt,
  Sun,
  Pill,
  Apple,
  Ship,
  Film,
  Hammer,
  Heart,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  laptop: Laptop,
  fuel: Fuel,
  briefcase: Briefcase,
  building: HardHat,
  shirt: Shirt,
  sun: Sun,
  pill: Pill,
  apple: Apple,
  ship: Ship,
  film: Film,
  hammer: Hammer,
};

// SVG Coordinate Constants
const CENTER_X = 350;
const CENTER_Y = 300;
const INDUSTRY_RADIUS = 220;
const COMPANY_RADIUS = 290;
const LABEL_RADIUS = 310;

export function NucleusVisualization({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { data: industries = [] } = useIndustries();
  const { data: companies = [] } = useCompanies();

  // State for interaction
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Helper: Convert polar to cartesian
  const polarToCartesian = useCallback((angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER_X + radius * Math.cos(rad),
      y: CENTER_Y + radius * Math.sin(rad),
    };
  }, []);

  const getIndustryAngle = (index: number, total: number) => (index * 360) / total - 90;

  const getCompanyAngle = (index: number, total: number, baseAngle: number) => {
    const spread = 15;
    const startAngle = baseAngle - (spread * (total - 1)) / 2;
    return startAngle + index * spread;
  };

  const getCompaniesForIndustry = (industryId: string) => companies.filter((c) => c.industry_id === industryId);

  const wrapText = (text: string, maxChars: number = 20) => {
    if (text.length <= maxChars) return [text];
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    words.forEach((word) => {
      if ((currentLine + word).length <= maxChars) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // Interaction Handlers
  const handleMouseEnter = (id: string) => {
    if (!isLocked) setActiveIndustry(id);
  };

  const handleMouseLeave = () => {
    if (!isLocked) setActiveIndustry(null);
  };

  const handleToggleLock = (id: string) => {
    if (activeIndustry === id && isLocked) {
      setIsLocked(false);
      setActiveIndustry(null);
    } else {
      setActiveIndustry(id);
      setIsLocked(true);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto px-4 sm:px-0 ${className}`}>
      <svg viewBox="0 0 700 700" className="w-full h-auto touch-manipulation overflow-visible">
        {/* 1. Background Orbital Ring (Inner) */}
        <motion.circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={INDUSTRY_RADIUS}
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="1"
          opacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* 2. Outer Orbital Ring (Appears on Hover/Click) */}
        <AnimatePresence>
          {activeIndustry && (
            <motion.circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={COMPANY_RADIUS}
              fill="none"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.9, pathLength: 0 }}
              animate={{ opacity: 0.1, scale: 1, pathLength: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: "center" }}
            />
          )}
        </AnimatePresence>

        {/* 3. Industry Nodes */}
        {industries.map((industry, index) => {
          const angle = getIndustryAngle(index, industries.length);
          const pos = polarToCartesian(angle, INDUSTRY_RADIUS);
          const Icon = iconMap[industry.icon || "building"] || Building2;
          const isActive = activeIndustry === industry.id;
          const nameLines = wrapText(industry.name, 26);

          return (
            <motion.g
              key={industry.id}
              className="cursor-pointer"
              onMouseEnter={() => handleMouseEnter(industry.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleToggleLock(industry.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
            >
              {/* Hitbox to bridge the gap to child nodes */}
              <circle cx={pos.x} cy={pos.y} r={40} fill="transparent" />

              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 26 : 20}
                fill={isActive ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                stroke="hsl(var(--accent))"
                strokeWidth={isActive ? 3 : 1.5}
                animate={{ scale: isActive ? 1.1 : 1 }}
              />
              <foreignObject x={pos.x - 10} y={pos.y - 10} width="20" height="20" className="pointer-events-none">
                <Icon className={`w-5 h-5 ${isActive ? "text-accent-foreground" : "text-primary-foreground/70"}`} />
              </foreignObject>

              <text
                x={pos.x}
                y={pos.y - 35}
                textAnchor="middle"
                className="text-[10px] fill-primary-foreground  pointer-events-none"
              >
                {nameLines.map((line, i) => (
                  <tspan key={i} x={pos.x} dy={i === 0 ? -4 : 11}>
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}

        {/* 4. Company (Child) Nodes */}
        <AnimatePresence>
          {activeIndustry &&
            industries
              .filter((i) => i.id === activeIndustry)
              .map((industry) => {
                const industryIndex = industries.findIndex((i) => i.id === industry.id);
                const industryAngle = getIndustryAngle(industryIndex, industries.length);
                const industryCompanies = getCompaniesForIndustry(industry.id);

                return industryCompanies.map((company, companyIndex) => {
                  const angle = getCompanyAngle(companyIndex, industryCompanies.length, industryAngle);
                  const pos = polarToCartesian(angle, COMPANY_RADIUS);
                  const labelPos = polarToCartesian(angle, LABEL_RADIUS);
                  const isRightSide = angle > -90 && angle < 90;
                  const nameLines = wrapText(company.name, 22);

                  return (
                    <motion.g
                      key={company.id}
                      className="cursor-pointer bg-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/companies/${company.slug}`);
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: companyIndex * 0.05 }}
                    >
                      <circle cx={pos.x} cy={pos.y} r={8} fill="hsl(var(--accent))" />
                      <text
                        x={labelPos.x + (isRightSide ? 10 : -10)}
                        y={labelPos.y}
                        textAnchor={isRightSide ? "start" : "end"}
                        dominantBaseline="middle"
                        className="text-[9px] fill-primary-foreground font-medium"
                      >
                        {nameLines.map((line, i) => (
                          <tspan key={i} x={labelPos.x + (isRightSide ? 10 : -10)} dy={i === 0 ? 0 : 11}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </motion.g>
                  );
                });
              })}
        </AnimatePresence>

        {/* 5. Center Logo */}
        <motion.g
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1.5, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
        >
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="52"
            fill="hsl(var(--background))"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />
          <foreignObject x={CENTER_X - 45} y={CENTER_Y - 35} width="90" height="70">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </foreignObject>
        </motion.g>
      </svg>

      <div className="mt-4 sm:-mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-2 border-accent" />
          <span className="text-muted-foreground">Industries ({industries.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent" />
          <span className="text-muted-foreground">Companies ({companies.length})</span>
        </div>
      </div>

      {/* Instruction hint */}
      <p className="text-center text-xs text-muted-foreground mt-2">Tap an industry to explore companies</p>
    </div>
  );
}
