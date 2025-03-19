
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CtaSection = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Coming Soon!",
      description: "Sign up functionality will be available in the next update.",
    });
  };

  return (
    <section className="eco-section bg-primary/10">
      <div className="eco-container">
        <div className="bg-card dark:bg-card/80 shadow-xl rounded-2xl p-8 md:p-12 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-eco-green-light/20 rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-eco-earth-yellow/10 rounded-full"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="eco-heading mb-4">Ready to Make Your Events Sustainable?</h2>
            <p className="eco-subheading mb-8">
              Join thousands of event organizers who are making a positive environmental and social impact with every event.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="eco-btn-primary text-lg px-8 py-6 rounded-full"
                onClick={handleGetStarted}
              >
                Get Started for Free
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full"
                onClick={() => window.location.href = "#features"}
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
