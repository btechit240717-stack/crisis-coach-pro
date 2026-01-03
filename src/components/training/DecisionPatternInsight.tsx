import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, AlertTriangle, Shield } from "lucide-react";

interface DecisionLog {
  is_correct: boolean;
  tone: string | null;
  key_takeaway: string | null;
}

interface DecisionPatternInsightProps {
  logs: DecisionLog[];
}

export const DecisionPatternInsight = ({ logs }: DecisionPatternInsightProps) => {
  if (logs.length === 0) return null;

  // Analyze patterns
  const correctCount = logs.filter(log => log.is_correct).length;
  const correctRate = correctCount / logs.length;
  const correctiveCount = logs.filter(log => log.tone === "corrective").length;
  const correctiveRate = correctiveCount / logs.length;
  
  // Determine pattern and insight
  const getPatternInsight = (): { icon: typeof Brain; insight: string; type: "success" | "warning" | "neutral" } => {
    // High accuracy with safety-first behavior
    if (correctRate >= 0.8) {
      return {
        icon: Shield,
        insight: "You consistently prioritize safety and risk avoidance. Your decision-making under pressure is methodical and reliable.",
        type: "success"
      };
    }
    
    // High corrective feedback rate
    if (correctiveRate >= 0.6) {
      return {
        icon: AlertTriangle,
        insight: "You tend to react quickly under pressure, which can sometimes reduce safety margins. Consider pausing before making critical decisions.",
        type: "warning"
      };
    }
    
    // Moderate performance with improvement trend
    if (correctRate >= 0.5) {
      return {
        icon: TrendingUp,
        insight: "Your responses show a balance between quick action and careful consideration. Continue practicing to build stronger instincts.",
        type: "neutral"
      };
    }
    
    // Needs more practice
    return {
      icon: Brain,
      insight: "Your training journey is just beginning. Focus on understanding the 'why' behind each correct response to build safer habits.",
      type: "warning"
    };
  };

  const pattern = getPatternInsight();
  const PatternIcon = pattern.icon;

  const bgColor = pattern.type === "success" 
    ? "bg-success/10 border-success/30" 
    : pattern.type === "warning" 
    ? "bg-accent/10 border-accent/30" 
    : "bg-primary/10 border-primary/30";
  
  const iconColor = pattern.type === "success" 
    ? "text-success" 
    : pattern.type === "warning" 
    ? "text-accent" 
    : "text-primary";

  return (
    <Card className="glass-card mb-8 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Decision Pattern Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`p-4 rounded-xl border-2 ${bgColor}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0`}>
              <PatternIcon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pattern.insight}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Based on analysis of {logs.length} decisions • {Math.round(correctRate * 100)}% accuracy
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
