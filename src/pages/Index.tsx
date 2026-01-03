import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="text-center animate-slide-up relative z-10 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary shadow-glow mb-6">
          <Shield className="w-12 h-12 text-primary-foreground" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-4">
          CRISISCOACH
        </h1>
        
        <p className="text-xl text-muted-foreground mb-2">
          Less panic, more thinking
        </p>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Train your crisis management skills through realistic scenario-based quizzes. 
          Learn to make the right decisions under pressure.
        </p>
        
        <Button 
          size="lg"
          onClick={() => navigate("/auth")}
          className="h-14 px-8 text-lg font-semibold btn-glow bg-primary hover:bg-primary/90"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
