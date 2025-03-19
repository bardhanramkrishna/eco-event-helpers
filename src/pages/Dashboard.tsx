
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Calendar, Trash, Heart, MapPin, BarChart, Recycle, Building, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import LocationMap from "@/components/maps/LocationMap";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { LocationType } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Location update schema
const locationSchema = z.object({
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
});

// Waste category data
const wasteCategories = [
  { id: "recycling", name: "Recyclable Waste", icon: Recycle, color: "text-blue-500" },
  { id: "orphanage", name: "Leftover Food", icon: Heart, color: "text-red-500" },
  { id: "biogas", name: "Organic Waste", icon: Building, color: "text-green-500" }
];

const Dashboard = () => {
  const { toast } = useToast();
  const { user, updateLocation } = useAuth();
  const [activeCategory, setActiveCategory] = useState<LocationType | "all">("all");
  const { locations } = useNearbyLocations(user?.location, activeCategory !== "all" ? activeCategory as LocationType : undefined);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: user?.location || "",
    },
  });

  const handleCreateEvent = () => {
    toast({
      title: "Coming Soon!",
      description: "Event creation will be available in the next update.",
    });
  };

  const handleUpdateLocation = async (values: z.infer<typeof locationSchema>) => {
    try {
      setIsUpdatingLocation(true);
      await updateLocation(values.location);
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsUpdatingLocation(false);
    }
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

        {/* Location Update Card */}
        <Card className="eco-card mb-8">
          <CardHeader>
            <CardTitle>Your Event Location</CardTitle>
            <CardDescription>Update your location to find nearby waste management facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...locationForm}>
              <form onSubmit={locationForm.handleSubmit(handleUpdateLocation)} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={locationForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Event Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Enter city or address" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="self-end min-w-32" 
                    disabled={isUpdatingLocation || !locationForm.formState.isDirty}
                  >
                    {isUpdatingLocation ? (
                      "Updating..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Location
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Each facility type count card */}
          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Total Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{locations.length}</p>
              <p className="text-muted-foreground text-sm">Total waste management facilities</p>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Recycle className="mr-2 h-5 w-5 text-eco-water-blue" />
                Recycling Centers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{locations.filter(l => l.type === 'recycling').length}</p>
              <p className="text-muted-foreground text-sm">Nearby recycling facilities</p>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Orphanages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{locations.filter(l => l.type === 'orphanage').length}</p>
              <p className="text-muted-foreground text-sm">For leftover food donations</p>
            </CardContent>
          </Card>

          <Card className="eco-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building className="mr-2 h-5 w-5 text-eco-earth-brown" />
                Biogas Plants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{locations.filter(l => l.type === 'biogas').length}</p>
              <p className="text-muted-foreground text-sm">For organic waste</p>
            </CardContent>
          </Card>
        </div>

        {/* Location Map */}
        <Card className="eco-card mb-8">
          <CardHeader>
            <CardTitle>Nearby Facilities</CardTitle>
            <CardDescription>Waste management facilities based on your location</CardDescription>
          </CardHeader>
          <CardContent>
            <LocationMap location={user?.location} />
          </CardContent>
        </Card>

        {/* Waste Categorization */}
        <Card className="eco-card mb-8">
          <CardHeader>
            <CardTitle>Smart Waste Categorization</CardTitle>
            <CardDescription>Select waste type to see recommended disposal options</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="all" 
              value={activeCategory} 
              onValueChange={(value) => setActiveCategory(value as LocationType | "all")}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Types</TabsTrigger>
                {wasteCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                    <category.icon className={`mr-2 h-4 w-4 ${category.color}`} />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <div className="bg-muted p-6 rounded-md">
                  <h3 className="text-lg font-medium mb-4">All Waste Management Facilities</h3>
                  {locations.length > 0 ? (
                    <div className="space-y-4">
                      {locations.map(location => (
                        <div key={location.id} className="bg-card p-4 rounded-md flex items-start gap-3">
                          {location.type === 'recycling' && <Recycle className="h-5 w-5 text-blue-500 mt-1" />}
                          {location.type === 'biogas' && <Building className="h-5 w-5 text-green-500 mt-1" />}
                          {location.type === 'orphanage' && <Heart className="h-5 w-5 text-red-500 mt-1" />}
                          <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-muted-foreground">{location.address}, {location.city}</p>
                            {location.contact && <p className="text-sm mt-1">{location.contact}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No facilities found near your location.</p>
                  )}
                </div>
              </TabsContent>
              
              {wasteCategories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="bg-muted p-6 rounded-md">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <category.icon className={`mr-2 h-5 w-5 ${category.color}`} />
                      {category.name} Disposal Recommendations
                    </h3>
                    
                    {locations.filter(l => l.type === category.id).length > 0 ? (
                      <div className="space-y-4">
                        {locations
                          .filter(location => location.type === category.id)
                          .map(location => (
                            <div key={location.id} className="bg-card p-4 rounded-md">
                              <p className="font-medium">{location.name}</p>
                              <p className="text-sm text-muted-foreground">{location.address}, {location.city}</p>
                              {location.contact && <p className="text-sm mt-1">{location.contact}</p>}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="bg-card p-4 rounded-md mb-4">
                        <p className="font-medium">No facilities found</p>
                        <p className="text-sm text-muted-foreground">No {category.name.toLowerCase()} disposal facilities found near your location.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
