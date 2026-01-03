import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Lightbulb,
  TrendingUp,
  FileText,
  RotateCcw,
  Home,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface DecisionLog {
  id: string;
  scenario: string;
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  key_takeaway: string | null;
  tone: string | null;
  created_at: string;
}

const AfterActionReport = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [logs, setLogs] = useState<DecisionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchDecisionLogs();
    }
  }, [user, authLoading, navigate]);

  const fetchDecisionLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("decision_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error("Error fetching decision logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const correctCount = logs.filter((log) => log.is_correct).length;
  const totalCount = logs.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const uniqueScenarios = [...new Set(logs.map((log) => log.scenario))];
  const keyTakeaways = logs
    .filter((log) => log.key_takeaway)
    .map((log) => log.key_takeaway)
    .slice(0, 5);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-display font-bold gradient-text">
                CRISISCOACH
              </span>
              <div className="text-xs text-muted-foreground">
                After Action Report
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-up">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">{totalCount}</div>
              <div className="text-sm text-muted-foreground">
                Decisions Logged
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-success">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">
                Accuracy Rate
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">
                {uniqueScenarios.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Categories Trained
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Takeaways */}
        {keyTakeaways.length > 0 && (
          <Card className="glass-card mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{takeaway}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Decision Log */}
        <Card className="glass-card animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Decision Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No decisions logged yet. Complete a quiz to see your report!
                </p>
                <Button onClick={() => navigate("/categories")}>
                  Start Training
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-4 rounded-xl border-2 ${
                        log.is_correct
                          ? "border-success/30 bg-success/5"
                          : "border-destructive/30 bg-destructive/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {log.scenario}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {log.is_correct ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              log.is_correct
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {log.is_correct ? "Correct" : "Incorrect"}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-medium mb-2 line-clamp-2">
                        {log.question}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-muted/30">
                          <span className="text-muted-foreground">
                            Your answer:{" "}
                          </span>
                          <span className="font-medium">{log.user_answer}</span>
                        </div>
                        {!log.is_correct && (
                          <div className="p-2 rounded bg-success/10">
                            <span className="text-muted-foreground">
                              Correct:{" "}
                            </span>
                            <span className="font-medium text-success">
                              {log.correct_answer}
                            </span>
                          </div>
                        )}
                      </div>

                      {log.key_takeaway && (
                        <div className="mt-3 p-2 rounded bg-accent/10 text-xs">
                          <span className="font-medium text-accent">
                            Takeaway:{" "}
                          </span>
                          <span className="text-muted-foreground">
                            {log.key_takeaway}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-slide-up">
          <Button
            onClick={() => navigate("/categories")}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Continue Training
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex-1"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AfterActionReport;
