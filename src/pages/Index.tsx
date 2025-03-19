
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <HeroSection />
      
      {/* Add prompt for users to sign in or get started if not logged in */}
      {!user && (
        <div className="py-8 bg-muted">
          <div className="eco-container text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to make your events more sustainable?</h2>
            <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              Join Eco Gen Events to connect with local recycling centers, biogas companies, and orphanages to efficiently manage your event waste.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="eco-btn-primary" 
                onClick={() => navigate("/auth?tab=sign-up")}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;
