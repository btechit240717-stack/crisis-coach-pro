import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookOpen, ClipboardCheck, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrainingModeToggleProps {
  isAssessmentMode: boolean;
  onModeChange: (isAssessment: boolean) => void;
}

export const TrainingModeToggle = ({ isAssessmentMode, onModeChange }: TrainingModeToggleProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
      <div className="flex items-center gap-3">
        {isAssessmentMode ? (
          <ClipboardCheck className="w-5 h-5 text-accent" />
        ) : (
          <BookOpen className="w-5 h-5 text-primary" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <Label 
              htmlFor="training-mode" 
              className="font-semibold cursor-pointer"
            >
              {isAssessmentMode ? "Assessment Mode" : "Training Mode"}
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    <strong>Training Mode:</strong> Get immediate AI feedback after each decision to learn as you go.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Assessment Mode:</strong> No feedback during quiz. See your complete After-Action Report at the end.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isAssessmentMode 
              ? "Feedback hidden until completion" 
              : "Immediate coaching after each decision"}
          </p>
        </div>
      </div>
      <Switch
        id="training-mode"
        checked={isAssessmentMode}
        onCheckedChange={onModeChange}
      />
    </div>
  );
};
