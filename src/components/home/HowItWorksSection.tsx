
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    number: "01",
    title: "Create an Event",
    description: "Register your event with details about location, date, expected waste, and leftover food.",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "02",
    title: "Find Local Resources",
    description: "Discover nearby recycling centers, biogas companies, and orphanages on our interactive map.",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "03",
    title: "Coordinate Pickups",
    description: "Connect with facilities for waste management and arrange food donations to orphanages.",
    image: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "04",
    title: "Track Your Impact",
    description: "Get detailed reports about your contribution to sustainability and social welfare.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const HowItWorksSection = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Coming Soon!",
      description: "Sign up functionality will be available in the next update.",
    });
  };

  return (
    <section className="eco-section bg-muted/50" id="how-it-works">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="eco-heading mb-4">How It Works</h2>
          <p className="eco-subheading max-w-3xl mx-auto">
            Our simple 4-step process makes it easy to manage event waste sustainably and donate leftover food.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-1 ${index % 2 === 0 ? 'lg:grid-cols-[1fr_2fr]' : 'lg:grid-cols-[2fr_1fr] lg:flex-row-reverse'} gap-8 items-center`}
            >
              <div className={`space-y-4 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-4 py-1 text-primary font-medium text-sm">
                  Step {step.number}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              <div className={`relative ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className={`absolute -z-10 ${index % 2 === 0 ? '-left-4 -top-4' : '-right-4 -top-4'} w-full h-full bg-eco-green-light/20 rounded-xl`}></div>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            className="eco-btn-primary text-lg px-8 py-6 rounded-full"
            onClick={handleGetStarted}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
