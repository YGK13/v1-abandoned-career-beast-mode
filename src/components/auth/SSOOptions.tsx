
import React from "react";

interface SSOOptionsProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const SSOOptions: React.FC<SSOOptionsProps> = ({
  onSuccess,
  onError,
  className,
}) => {
  // This is an empty component that can be expanded later if needed
  return null;
};

export default SSOOptions;
