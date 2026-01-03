import { AlertTriangle } from "lucide-react";

interface ConsequenceDisplayProps {
  consequence: string;
}

export const ConsequenceDisplay = ({ consequence }: ConsequenceDisplayProps) => {
  if (!consequence) return null;

  return (
    <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            Possible Real-World Consequence
          </span>
          <p className="text-sm text-muted-foreground mt-1">
            {consequence}
          </p>
        </div>
      </div>
    </div>
  );
};
