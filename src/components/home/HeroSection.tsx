
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Coming Soon!",
      description: "Sign up functionality will be available in the next update.",
    });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-eco-green-light/30 to-eco-water-blue/20 dark:from-eco-green-dark/30 dark:to-eco-water-blue/10" />
      
      <div className="eco-container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="eco-heading">
              Make Your Events <span className="text-primary">Sustainable</span> and <span className="text-eco-earth-brown dark:text-eco-earth-yellow">Impactful</span>
            </h1>
            <p className="eco-subheading max-w-xl mx-auto lg:mx-0">
              Connect with local recycling centers, biogas companies, and orphanages to manage waste efficiently and donate leftover food from your events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="eco-btn-primary text-lg px-6 py-6 rounded-full group"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-6 py-6 rounded-full"
                onClick={() => window.location.href = "#how-it-works"}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-eco-green-light rounded-full opacity-30 animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-eco-earth-yellow rounded-full opacity-20 animate-float animation-delay-1000"></div>
            
            {/* Hero Image */}
            <div className="bg-white dark:bg-card shadow-xl rounded-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Event sustainability" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-eco-green-medium text-white p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Reduce Event Waste</p>
                      <p className="text-sm text-muted-foreground">Connect with local recycling resources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
