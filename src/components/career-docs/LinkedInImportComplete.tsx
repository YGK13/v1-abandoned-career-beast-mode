
import React from "react";
import { UserCheck, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkedInImportCompleteProps {
  isSecured: boolean;
  onReset: () => void;
}

const LinkedInImportComplete: React.FC<LinkedInImportCompleteProps> = ({ isSecured, onReset }) => {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950/20 dark:border-green-800/30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <UserCheck size={16} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h5 className="font-medium">LinkedIn Profile Connected</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Your profile has been imported and analyzed.
          </p>
          <ul className="mt-2 text-sm space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-xs text-green-600 dark:text-green-400">✓</span>
              </span>
              <span>Professional headline imported</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-xs text-green-600 dark:text-green-400">✓</span>
              </span>
              <span>Work experience data imported (5 positions)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-xs text-green-600 dark:text-green-400">✓</span>
              </span>
              <span>Skills imported (12 skills)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-xs text-green-600 dark:text-green-400">✓</span>
              </span>
              <span>Education history imported</span>
            </li>
            {isSecured && (
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-green-600 dark:text-green-400" />
                  <span>Account secured with 2FA</span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={onReset} className="flex items-center gap-1">
          <RefreshCw size={14} /> Reset Demo
        </Button>
      </div>
    </div>
  );
};

export default LinkedInImportComplete;
