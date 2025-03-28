
import React, { forwardRef } from "react";
import { LucideProps } from "lucide-react";

// Create a custom GrowthChartIcon component with the hockey stick growth shape that's compatible with Lucide format
const GrowthChartIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 3v18h18" />
    <path d="M18 3v4h4" />
    <path d="M18 7 9 16l-3-3-3 3" />
  </svg>
));

// Add display name for better debugging
GrowthChartIcon.displayName = "GrowthChartIcon";

export default GrowthChartIcon;
