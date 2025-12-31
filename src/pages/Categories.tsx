import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, ArrowLeft, ShieldAlert, Dog, Car, School, Cloud, Flame, 
  Brain, FlaskConical, Leaf, Home, Heart, Zap, Phone, HardHat,
  Lock, CheckCircle
} from "lucide-react";

const categories = [
  { 
    id: "women-safety", 
    name: "Women Safety", 
    icon: ShieldAlert, 
    color: "from-pink-500 to-rose-600",
    description: "Learn to handle harassment, stalking, and safety threats",
    questions: 5
  },
  { 
    id: "animal-safety", 
    name: "Animal Safety", 
    icon: Dog, 
    color: "from-amber-500 to-orange-600",
    description: "Deal with aggressive animals and wildlife encounters",
    questions: 5
  },
  { 
    id: "road-accidents", 
    name: "Road Accidents", 
    icon: Car, 
    color: "from-red-500 to-red-700",
    description: "First response and safety during traffic incidents",
    questions: 5
  },
  { 
    id: "campus-emergencies", 
    name: "Campus Emergencies", 
    icon: School, 
    color: "from-blue-500 to-indigo-600",
    description: "Handle school and college emergency situations",
    questions: 5
  },
  { 
    id: "natural-disasters", 
    name: "Natural Disasters", 
    icon: Cloud, 
    color: "from-slate-500 to-slate-700",
    description: "Survive earthquakes, floods, and storms",
    questions: 5
  },
  { 
    id: "fire-emergencies", 
    name: "Fire Emergencies", 
    icon: Flame, 
    color: "from-orange-500 to-red-600",
    description: "Fire safety, evacuation, and first aid for burns",
    questions: 5
  },
  { 
    id: "mental-crisis", 
    name: "Mental & Emotional Crisis", 
    icon: Brain, 
    color: "from-purple-500 to-violet-600",
    description: "Support during panic attacks and mental health crises",
    questions: 5
  },
  { 
    id: "laboratory-safety", 
    name: "Laboratory Safety", 
    icon: FlaskConical, 
    color: "from-emerald-500 to-teal-600",
    description: "Chemical spills, equipment hazards, and lab protocols",
    questions: 5
  },
  { 
    id: "environmental-hazards", 
    name: "Environmental Hazards", 
    icon: Leaf, 
    color: "from-green-500 to-emerald-600",
    description: "Handle pollution, toxic exposure, and ecological threats",
    questions: 5
  },
  { 
    id: "home-safety", 
    name: "Home Safety", 
    icon: Home, 
    color: "from-cyan-500 to-blue-600",
    description: "Domestic emergencies, break-ins, and household accidents",
    questions: 5
  },
  { 
    id: "medical-emergencies", 
    name: "Medical Emergencies", 
    icon: Heart, 
    color: "from-rose-500 to-pink-600",
    description: "CPR, choking, heart attacks, and first aid basics",
    questions: 5
  },
  { 
    id: "electrical-hazards", 
    name: "Electrical Hazards", 
    icon: Zap, 
    color: "from-yellow-500 to-amber-600",
    description: "Electrocution prevention and electrical fire safety",
    questions: 5
  },
];

const Categories = () => {
  const navigate = useNavigate();
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("crisiscoach_user");
    if (!userData) {
      navigate("/");
      return;
    }
    const user = JSON.parse(userData);
    setCompletedCategories(user.completedCategories || []);
  }, [navigate]);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/quiz/${categoryId}`);
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
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Choose Your Training Category
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a crisis scenario to test your knowledge. Each category contains 5 realistic scenarios 
            with a 30-second timer per question.
          </p>
        </div>

        {/* Progress Summary */}
        <div className="flex justify-center gap-4 mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-success" />
            {completedCategories.length} / {categories.length} Completed
          </Badge>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isCompleted = completedCategories.includes(category.id);
            
            return (
              <Card 
                key={category.id}
                className={`cursor-pointer overflow-hidden transition-all duration-300 animate-slide-up ${
                  hoveredCategory === category.id ? "scale-105 shadow-lg" : ""
                } ${isCompleted ? "ring-2 ring-success/50" : ""}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className={`h-24 bg-gradient-to-br ${category.color} flex items-center justify-center relative`}>
                  <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {category.questions} Questions
                    </Badge>
                    {isCompleted ? (
                      <Badge className="bg-success text-success-foreground text-xs">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Not Started
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Level Legend */}
        <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
          <h3 className="font-display font-semibold mb-4 text-center">Level Progression</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Bronze", color: "medal-bronze", range: "0-100" },
              { name: "Silver", color: "medal-silver", range: "100-250" },
              { name: "Gold", color: "medal-gold", range: "250-500" },
              { name: "Diamond", color: "medal-diamond", range: "500-800" },
              { name: "Platinum", color: "medal-platinum", range: "800+" },
            ].map((level) => (
              <div key={level.name} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${level.color}`} />
                <div>
                  <div className="text-sm font-medium">{level.name}</div>
                  <div className="text-xs text-muted-foreground">{level.range} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
