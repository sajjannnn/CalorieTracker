import { Flame } from "lucide-react";

interface CalorieRingProps {
  consumed: number;
  goal: number;
}

export function CalorieRing({ consumed, goal }: CalorieRingProps) {
  const percentage = Math.min((consumed / goal) * 100, 100);

  // SVG circle properties
  const size = 200;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
return(
  <div className="relative">
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth={strokeWidth} />
      {/* Progress circle */}
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--primary))" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="calorie-ring" />
    </svg>

    {/* Center content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Flame className="w-6 h-6 text-accent mb-1 text-orange-400" />
      <span className="font-display text-3xl font-bold text-foreground">{consumed.toLocaleString()}</span>
      <span className="text-sm text-muted-foreground">kcal consumed</span>
    </div>
  </div>);
}
