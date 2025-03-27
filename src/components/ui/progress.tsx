
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "circular"
  size?: "sm" | "md" | "lg"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "default", size = "md", ...props }, ref) => {
  if (variant === "circular") {
    // Calculate circle properties based on size
    const getCircleProps = () => {
      switch (size) {
        case "sm": return { size: 60, strokeWidth: 4 };
        case "lg": return { size: 120, strokeWidth: 8 };
        default: return { size: 80, strokeWidth: 6 };
      }
    };

    const { size: circleSize, strokeWidth } = getCircleProps();
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value || 0) / 100 * circumference;

    return (
      <div 
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: circleSize, height: circleSize }}
      >
        <svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
          {/* Background circle */}
          <circle 
            className="text-secondary" 
            stroke="currentColor" 
            fill="transparent" 
            strokeWidth={strokeWidth} 
            r={radius} 
            cx={circleSize/2} 
            cy={circleSize/2} 
          />
          {/* Progress circle */}
          <circle 
            className="text-primary transition-all duration-300 ease-in-out" 
            stroke="currentColor" 
            fill="transparent" 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" 
            r={radius} 
            cx={circleSize/2} 
            cy={circleSize/2} 
            transform={`rotate(-90 ${circleSize/2} ${circleSize/2})`} 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-foreground font-medium">
            {Math.round(value || 0)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
