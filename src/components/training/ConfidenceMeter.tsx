import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gauge, Zap, Heart, Shield } from "lucide-react";

interface DecisionLog {
  is_correct: boolean;
  tone: string | null;
  user_answer: string;
}

interface ConfidenceMeterProps {
  logs: DecisionLog[];
}

export const ConfidenceMeter = ({ logs }: ConfidenceMeterProps) => {
  if (logs.length === 0) return null;

  // Calculate confidence score
  const calculateConfidenceScore = (): number => {
    let score = 50; // Start at 50%
    
    logs.forEach(log => {
      // Correct decision: +8 points
      if (log.is_correct) {
        score += 8;
      } else {
        // Incorrect: -5 points
        score -= 5;
      }
      
      // Timeout (no answer): extra -3 points
      if (log.user_answer.includes("No answer") || log.user_answer.includes("time expired")) {
        score -= 3;
      }
      
      // Encouraging tone (safety-first): +2 bonus
      if (log.tone === "encouraging" && log.is_correct) {
        score += 2;
      }
    });
    
    // Clamp between 0 and 100
    return Math.max(0, Math.min(100, score));
  };

  const confidenceScore = calculateConfidenceScore();

  const getScoreLabel = (score: number): { label: string; description: string; color: string } => {
    if (score >= 85) {
      return {
        label: "Excellent",
        description: "You remain composed under pressure and make sound decisions.",
        color: "text-success"
      };
    }
    if (score >= 70) {
      return {
        label: "Good",
        description: "You handle pressure well with occasional hesitation.",
        color: "text-primary"
      };
    }
    if (score >= 50) {
      return {
        label: "Developing",
        description: "You're building resilience. Keep practicing to improve.",
        color: "text-accent"
      };
    }
    return {
      label: "Needs Work",
      description: "More training will help you stay calmer under pressure.",
      color: "text-destructive"
    };
  };

  const scoreInfo = getScoreLabel(confidenceScore);

  const getProgressColor = (score: number): string => {
    if (score >= 85) return "bg-success";
    if (score >= 70) return "bg-primary";
    if (score >= 50) return "bg-accent";
    return "bg-destructive";
  };

  return (
    <Card className="glass-card mb-8 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-primary" />
          Confidence Under Pressure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Meter */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm text-muted-foreground">Calmness Score</span>
              <div className="text-right">
                <span className={`text-3xl font-bold ${scoreInfo.color}`}>
                  {Math.round(confidenceScore)}%
                </span>
              </div>
            </div>
            
            <div className="h-4 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(confidenceScore)}`}
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
            
            {/* Scale markers */}
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>

          {/* Score Assessment */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-semibold ${scoreInfo.color}`}>
                {scoreInfo.label}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {scoreInfo.description}
            </p>
          </div>

          {/* Metrics breakdown */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-3 rounded-lg bg-success/10">
              <Shield className="w-5 h-5 text-success mx-auto mb-1" />
              <div className="text-lg font-bold text-success">
                {logs.filter(l => l.is_correct).length}
              </div>
              <div className="text-xs text-muted-foreground">Safe Choices</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-accent/10">
              <Zap className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-lg font-bold text-accent">
                {logs.filter(l => l.user_answer.includes("No answer")).length}
              </div>
              <div className="text-xs text-muted-foreground">Timeouts</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-primary/10">
              <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-primary">
                {logs.filter(l => l.tone === "encouraging").length}
              </div>
              <div className="text-xs text-muted-foreground">Calm Decisions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
