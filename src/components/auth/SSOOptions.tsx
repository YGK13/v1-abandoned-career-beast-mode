
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
  // This is an empty component that will be rebuilt later
  return null;
};

export default SSOOptions;
