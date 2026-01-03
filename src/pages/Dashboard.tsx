import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, Trophy, Medal, Star, Play, ArrowLeft,
  TrendingUp, Target, Crown, Gem, Award, Share2, Users, Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  name: string;
  phone: string | null;
  role: string;
}

interface UserProgress {
  score: number;
  level: string;
  completed_categories: string[];
  medals: string[];
}

const levelConfig = {
  bronze: { color: "bg-bronze", next: "silver", minScore: 0, maxScore: 100, icon: Medal },
  silver: { color: "bg-silver", next: "gold", minScore: 100, maxScore: 250, icon: Award },
  gold: { color: "bg-gold", next: "diamond", minScore: 250, maxScore: 500, icon: Trophy },
  diamond: { color: "bg-diamond", next: "platinum", minScore: 500, maxScore: 800, icon: Gem },
  platinum: { color: "bg-platinum", next: null, minScore: 800, maxScore: 1000, icon: Crown },
};

const leaderboard = [
  { name: "Alex Chen", score: 890, level: "platinum", rank: 1 },
  { name: "Sarah Johnson", score: 756, level: "diamond", rank: 2 },
  { name: "Mike Peters", score: 645, level: "diamond", rank: 3 },
  { name: "Emma Wilson", score: 534, level: "gold", rank: 4 },
  { name: "James Brown", score: 423, level: "gold", rank: 5 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, navigate]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("name, phone, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      // Fetch progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("score, level, completed_categories, medals")
        .eq("user_id", user.id)
        .maybeSingle();

      if (progressError) throw progressError;

      setProfile(profileData);
      setProgress(progressData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error loading data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile || !progress) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Profile not found</h2>
          <Button onClick={() => navigate("/auth")}>
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  const currentLevel = levelConfig[progress.level as keyof typeof levelConfig] || levelConfig.bronze;
  const LevelIcon = currentLevel.icon;
  const levelProgress = ((progress.score - currentLevel.minScore) / (currentLevel.maxScore - currentLevel.minScore)) * 100;

  const handleShare = () => {
    const shareText = `🛡️ I'm training crisis management skills on CrisisCoach!\n\n📊 Score: ${progress.score}\n🏅 Level: ${progress.level.charAt(0).toUpperCase() + progress.level.slice(1)}\n\nJoin me and learn to stay calm under pressure!`;
    
    if (navigator.share) {
      navigator.share({
        title: "CrisisCoach - My Progress",
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your progress with friends.",
      });
    }
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
            <span className="text-xl font-display font-bold gradient-text">CRISISCOACH</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="glass-card overflow-hidden animate-slide-up">
              <div className="h-20 bg-gradient-to-r from-primary to-primary/70" />
              <CardContent className="pt-0 -mt-10">
                <div className="flex flex-col items-center">
                  <Avatar className="w-20 h-20 border-4 border-card shadow-lg">
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                      {profile.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-display font-bold mt-3">{profile.name}</h2>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {profile.role}
                  </Badge>
                  
                  {/* Level Badge */}
                  <div className={`mt-4 px-4 py-2 rounded-full ${currentLevel.color} flex items-center gap-2`}>
                    <LevelIcon className="w-5 h-5 text-foreground" />
                    <span className="font-semibold capitalize text-foreground">{progress.level} Level</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">{progress.score}</div>
                    <div className="text-xs text-muted-foreground">Total Score</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-accent">{progress.completed_categories.length}</div>
                    <div className="text-xs text-muted-foreground">Categories</div>
                  </div>
                </div>

                {/* Progress to next level */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress to {currentLevel.next || "Max"}</span>
                    <span className="font-medium">{Math.round(Math.min(levelProgress, 100))}%</span>
                  </div>
                  <Progress value={Math.min(levelProgress, 100)} className="h-2" />
                </div>

                {/* Share Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Progress
                </Button>
              </CardContent>
            </Card>

            {/* Medals */}
            <Card className="glass-card animate-slide-up stagger-1">
              <CardContent className="pt-6">
                <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-accent" />
                  Earned Medals
                </h3>
                {progress.medals.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {progress.medals.map((medal, index) => (
                      <Badge key={index} className="bg-accent text-accent-foreground">
                        {medal}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Complete quizzes to earn medals!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <Card className="glass-card overflow-hidden animate-slide-up">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                      Welcome back, {profile.name.split(" ")[0]}!
                    </h1>
                    <p className="text-muted-foreground">
                      Ready to sharpen your crisis management skills? Choose a category and test your knowledge.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-float">
                      <Target className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="card-hover animate-slide-up stagger-1">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{progress.score}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover animate-slide-up stagger-2">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{progress.completed_categories.length}/12</div>
                    <div className="text-sm text-muted-foreground">Categories Done</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover animate-slide-up stagger-3">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Medal className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{progress.medals.length}</div>
                    <div className="text-sm text-muted-foreground">Medals Won</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card className="glass-card animate-slide-up stagger-2">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  Global Leaderboard
                </h3>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        player.name === profile.name ? "bg-primary/10 border border-primary/20" : "bg-muted/30 hover:bg-muted/50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        player.rank === 1 ? "bg-gold text-foreground" :
                        player.rank === 2 ? "bg-silver text-foreground" :
                        player.rank === 3 ? "bg-bronze text-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {player.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{player.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{player.level} Level</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{player.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Start Button - Fixed Bottom Right */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            size="lg"
            className="h-16 px-8 text-lg font-semibold btn-glow btn-accent-glow bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg animate-bounce-in"
            onClick={() => navigate("/categories")}
          >
            <Play className="w-6 h-6 mr-2" />
            Start Training
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
