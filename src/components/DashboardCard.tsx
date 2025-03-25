
import React, { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  isGlass?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  children,
  footer,
  isGlass = false,
  isHoverable = false,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300",
        isGlass && "glass-card",
        isHoverable && "hover-scale",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <CardHeader className={cn("pb-2", headerClassName)}>
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </CardHeader>
      )}
      <CardContent className={cn("", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("pt-2", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
