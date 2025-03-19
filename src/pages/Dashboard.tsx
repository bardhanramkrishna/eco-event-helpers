
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Calendar, Trash, Heart, MapPin, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  const handleCreateEvent = () => {
    toast({
      title: "Coming Soon!",
      description: "Event creation will be available in the next update.",
    });
  };

  return (
    <MainLayout>
      <div className="eco-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and monitor sustainability impact</p>
          </div>
          <Button className="eco-btn-primary" onClick={handleCreateEvent}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-muted-foreground text-sm">Events managed</p>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Trash className="mr-2 h-5 w-5 text-eco-water-blue" />
                Waste Recycled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0 kg</p>
              <p className="text-muted-foreground text-sm">Total waste recycled</p>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Food Donated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0 kg</p>
              <p className="text-muted-foreground text-sm">Total food donated</p>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-eco-earth-brown" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-muted-foreground text-sm">Facilities connected</p>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="eco-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Manage your recent events and their sustainability metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="py-12 text-center text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p>No events created yet</p>
                  <Button className="mt-4" variant="outline" onClick={handleCreateEvent}>
                    Create Your First Event
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader>
              <CardTitle>Sustainability Impact</CardTitle>
              <CardDescription>Your environmental contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>CO₂ Emissions Saved</span>
                    <span className="font-medium">0 kg</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2 w-0"></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Water Saved</span>
                    <span className="font-medium">0 L</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-eco-water-blue rounded-full h-2 w-0"></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Trees Equivalent</span>
                    <span className="font-medium">0 trees</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-eco-green-medium rounded-full h-2 w-0"></div>
                  </div>
                </div>
                
                <div className="pt-4 text-center">
                  <Button variant="outline" className="w-full" onClick={() => toast({ title: "Coming Soon!", description: "Detailed analytics will be available in the next update." })}>
                    <BarChart className="mr-2 h-4 w-4" />
                    View Detailed Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
