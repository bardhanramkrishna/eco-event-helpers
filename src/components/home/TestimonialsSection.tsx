
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content: "Eco Gen Events helped us reduce our event waste by 75% and connect with a local orphanage to donate leftover food. The platform is incredibly intuitive and efficient.",
    name: "Sarah Johnson",
    role: "Event Manager, Green Conference 2023",
    avatar: "SJ",
  },
  {
    content: "Finding recycling facilities used to be a time-consuming process. This platform has streamlined our waste management process and saved us countless hours.",
    name: "Michael Chen",
    role: "Sustainability Director, TechExpo",
    avatar: "MC",
  },
  {
    content: "As an orphanage, we've received quality food donations through this platform. It's been a blessing for our children and has created meaningful community connections.",
    name: "Grace Okafor",
    role: "Director, Hope Children's Home",
    avatar: "GO",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="eco-section">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="eco-heading mb-4">What Our Users Say</h2>
          <p className="eco-subheading max-w-3xl mx-auto">
            Hear from event organizers, waste management facilities, and donation recipients about their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="eco-card h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow mb-6">
                  <p className="italic text-foreground">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
