
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, Heart, Map, BarChart } from "lucide-react";

const features = [
  {
    title: "Waste Management",
    description: "Find nearby recycling centers and biogas companies to handle different types of event waste efficiently.",
    icon: Recycle,
    color: "text-eco-green-medium",
    bgColor: "bg-eco-green-light/20",
  },
  {
    title: "Food Donation",
    description: "Connect with local orphanages and donate leftover food from your events to reduce food waste.",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
  {
    title: "Location Finder",
    description: "Use our interactive map to find and connect with waste management facilities and donation centers.",
    icon: Map,
    color: "text-eco-water-blue",
    bgColor: "bg-eco-water-blue/20",
  },
  {
    title: "Sustainability Analytics",
    description: "Track your environmental impact with detailed reports on waste diverted and donations made.",
    icon: BarChart,
    color: "text-eco-earth-brown",
    bgColor: "bg-eco-earth-yellow/20",
  },
];

const FeaturesSection = () => {
  return (
    <section className="eco-section" id="features">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="eco-heading mb-4">Making Events Sustainable</h2>
          <p className="eco-subheading max-w-3xl mx-auto">
            Our platform connects event organizers with local resources to manage waste
            efficiently and make a positive social impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="eco-card hover:scale-105">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
