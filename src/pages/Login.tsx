import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, Heart, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const roles = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "professional", label: "Working Professional" },
    { value: "parent", label: "Parent" },
    { value: "volunteer", label: "Volunteer" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Store user data in localStorage for this session
    localStorage.setItem("crisiscoach_user", JSON.stringify({
      ...formData,
      score: 0,
      level: "bronze",
      completedCategories: [],
      medals: [],
      joinedAt: new Date().toISOString(),
    }));

    // Simulate a brief loading state
    setTimeout(() => {
      toast({
        title: "Welcome to CrisisCoach!",
        description: "Ready to train your crisis management skills?",
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Floating icons */}
      <div className="absolute top-32 right-20 animate-float opacity-20">
        <Shield className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <AlertTriangle className="w-12 h-12 text-accent" />
      </div>
      <div className="absolute top-1/2 right-32 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Heart className="w-10 h-10 text-primary" />
      </div>

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-glow mb-4">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">
            CRISISCOACH
          </h1>
          <p className="text-muted-foreground font-medium">
            Less panic, more thinking
          </p>
        </div>

        <Card className="glass-card border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-display text-center">
              Welcome, Trainee!
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to begin your crisis management training
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger className="h-12 bg-background/50">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold btn-glow bg-primary hover:bg-primary/90 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Starting Training...
                  </>
                ) : (
                  <>
                    Start Training
                    <Shield className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to train responsibly and apply these skills ethically.
        </p>
      </div>
    </div>
  );
};

export default Login;
