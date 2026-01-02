import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, ArrowLeft, Clock, CheckCircle, XCircle, 
  Loader2, ChevronRight, Trophy, RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { scenariosByCategory } from "@/data/scenarios";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserData {
  name: string;
  email: string;
  phone: string;
  role: string;
  score: number;
  level: string;
  completedCategories: string[];
  medals: string[];
  joinedAt: string;
}

const categoryNames: { [key: string]: string } = {
  "women-safety": "Women Safety",
  "animal-safety": "Animal Safety",
  "road-accidents": "Road Accidents",
  "campus-emergencies": "Campus Emergencies",
  "natural-disasters": "Natural Disasters",
  "fire-emergencies": "Fire Emergencies",
  "mental-crisis": "Mental & Emotional Crisis",
  "laboratory-safety": "Laboratory Safety",
  "environmental-hazards": "Environmental Hazards",
  "home-safety": "Home Safety",
  "medical-emergencies": "Medical Emergencies",
  "electrical-hazards": "Electrical Hazards",
};

const Quiz = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const scenarios = categoryId ? scenariosByCategory[categoryId] || [] : [];
  const currentScenario = scenarios[currentQuestion];
  const totalQuestions = scenarios.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (isAnswered || timeLeft === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      toast({
        title: "Time's up!",
        description: "The correct answer has been revealed.",
        variant: "destructive",
      });
      evaluateAnswer(-1); // -1 indicates timeout
    }
  }, [isAnswered, toast]);

  const evaluateAnswer = async (answer: number) => {
    if (!currentScenario) return;

    setIsLoading(true);

    const isCorrect = answer === currentScenario.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 20);
      setCorrectAnswers((prev) => prev + 1);
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "evaluate-answer",
        {
          body: {
            question: currentScenario.question,
            userAnswer:
              answer >= 0
                ? currentScenario.options[answer]
                : "No answer (time expired)",
            correctAnswer:
              currentScenario.options[currentScenario.correctAnswer],
            isCorrect,
            explanation: currentScenario.explanation,
          },
        }
      );

      if (error) throw error;

      setAiExplanation(data.feedback);

      /* ================= SAVE DECISION LOG ================= */
      await supabase.from("decision_logs" as any).insert({
        scenario: categoryNames[categoryId ?? ""] || "Unknown",
        question: currentScenario.question,
        user_answer:
          answer >= 0
            ? currentScenario.options[answer]
            : "No answer (time expired)",
        correct_answer:
          currentScenario.options[currentScenario.correctAnswer],
        is_correct: isCorrect,
        key_takeaway: data.key_takeaway ?? data.feedback,
        tone: data.tone ?? (isCorrect ? "encouraging" : "corrective"),
      });
      /* ====================================================== */
    } catch (error) {
      console.error("AI evaluation failed:", error);
      setAiExplanation(
        isCorrect
          ? `Great job! ${currentScenario.explanation}`
          : `Correct approach: ${currentScenario.explanation}`
      );
    } finally {
      setIsLoading(false);
      setShowResult(true);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    evaluateAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowResult(false);
      setAiExplanation(null);
      setTimeLeft(30);
    } else {
      // Quiz completed
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    // Update user data
    const userData = localStorage.getItem("crisiscoach_user");
    if (userData && categoryId) {
      const user: UserData = JSON.parse(userData);
      
      // Add category to completed list if not already there
      if (!user.completedCategories.includes(categoryId)) {
        user.completedCategories.push(categoryId);
      }
      
      // Add score
      user.score += score;
      
      // Update level based on total score
      if (user.score >= 800) user.level = "platinum";
      else if (user.score >= 500) user.level = "diamond";
      else if (user.score >= 250) user.level = "gold";
      else if (user.score >= 100) user.level = "silver";
      
      // Award medal if perfect score
      if (correctAnswers === totalQuestions) {
        const medalName = `${categoryNames[categoryId]} Master`;
        if (!user.medals.includes(medalName)) {
          user.medals.push(medalName);
        }
      }
      
      localStorage.setItem("crisiscoach_user", JSON.stringify(user));
    }
    
    setShowCompletionDialog(true);

    /* ================= GO TO AAR ================= */
    setTimeout(() => {
      navigate("/after-action-report");
    }, 800);
    /* ============================================== */
  };

  if (!categoryId || !scenarios.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Category not found</h2>
          <Button onClick={() => navigate("/categories")}>
            Back to Categories
          </Button>
        </Card>
      </div>
    );
  }

  const getTimerColor = () => {
    if (timeLeft <= 5) return "text-destructive";
    if (timeLeft <= 10) return "text-accent";
    return "text-primary";
  };

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
              <span className="text-lg font-display font-bold gradient-text">CRISISCOACH</span>
              <div className="text-xs text-muted-foreground">{categoryNames[categoryId]}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/categories")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Quiz
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <Badge variant="outline" className="font-mono">
              Score: {score}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timer */}
        <div className="flex justify-center mb-6">
          <div className={`flex items-center gap-2 px-6 py-3 rounded-full bg-card border shadow-sm ${timeLeft <= 10 ? 'animate-countdown' : ''}`}>
            <Clock className={`w-5 h-5 ${getTimerColor()}`} />
            <span className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="glass-card mb-6 animate-slide-up overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Scenario {currentQuestion + 1}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentScenario?.scenario}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-xl leading-relaxed mb-6">
              {currentScenario?.question}
            </CardTitle>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentScenario?.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentScenario.correctAnswer;
                const showCorrect = isAnswered && isCorrect;
                const showWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      isAnswered
                        ? showCorrect
                          ? "border-success bg-success/10 text-foreground"
                          : showWrong
                          ? "border-destructive bg-destructive/10 text-foreground"
                          : "border-border bg-muted/30 opacity-60"
                        : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showCorrect
                          ? "bg-success text-success-foreground"
                          : showWrong
                          ? "bg-destructive text-destructive-foreground"
                          : isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {showCorrect ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : showWrong ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Explanation */}
        {showResult && (
          <Card className="glass-card animate-scale-in border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Coach's Feedback</h4>
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing your response...</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {aiExplanation}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Button */}
        {showResult && !isLoading && (
          <div className="flex justify-end mt-6 animate-slide-up">
            <Button
              size="lg"
              onClick={handleNextQuestion}
              className="btn-glow bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {currentQuestion < totalQuestions - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  Complete Quiz
                  <Trophy className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Completion Dialog */}
      <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-in">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-2xl">
              Quiz Completed!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4">
              <p>You've completed the {categoryNames[categoryId]} training!</p>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-3xl font-bold text-primary">{score}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="text-3xl font-bold text-success">
                    {correctAnswers}/{totalQuestions}
                  </div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
              </div>

              {correctAnswers === totalQuestions && (
                <Badge className="bg-accent text-accent-foreground mx-auto">
                  🏆 Perfect Score! Medal Earned!
                </Badge>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction 
              onClick={() => navigate("/dashboard")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Back to Dashboard
            </AlertDialogAction>
            <Button 
              variant="outline" 
              onClick={() => navigate("/categories")}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Another Category
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Quiz;
