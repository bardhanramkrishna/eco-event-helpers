
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Recycle, Heart, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dummy data for facilities
const dummyFacilities = {
  recyclingCenters: [
    { id: 1, name: "EcoRecycle Center", address: "123 Green St, Eco City", distance: "2.3 km", contact: "+1 555-123-4567" },
    { id: 2, name: "Urban Recyclers", address: "456 Sustainable Ave, Eco City", distance: "3.5 km", contact: "+1 555-987-6543" },
    { id: 3, name: "Green Planet Recycling", address: "789 Earth Blvd, Eco City", distance: "4.8 km", contact: "+1 555-456-7890" },
  ],
  biogasCompanies: [
    { id: 1, name: "Biogas Solutions", address: "234 Energy Lane, Eco City", distance: "3.1 km", contact: "+1 555-234-5678" },
    { id: 2, name: "Organic Power Co.", address: "567 Natural Way, Eco City", distance: "5.2 km", contact: "+1 555-876-5432" },
  ],
  orphanages: [
    { id: 1, name: "Hope Children's Home", address: "345 Care Street, Eco City", distance: "1.8 km", contact: "+1 555-345-6789" },
    { id: 2, name: "Sunshine Orphanage", address: "678 Kindness Rd, Eco City", distance: "4.0 km", contact: "+1 555-765-4321" },
    { id: 3, name: "Little Angels Home", address: "901 Compassion Ave, Eco City", distance: "6.5 km", contact: "+1 555-543-2109" },
  ],
};

const LocationCard = ({ facility, icon: Icon, onViewDetails }) => (
  <Card className="eco-card">
    <CardContent className="p-6">
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{facility.name}</h3>
            <p className="text-sm text-muted-foreground">{facility.address}</p>
            <div className="flex items-center mt-2">
              <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
              <span className="text-xs text-muted-foreground">{facility.distance}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground">{facility.contact}</p>
        <Button size="sm" onClick={() => onViewDetails(facility)}>
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Locations = () => {
  const [activeTab, setActiveTab] = useState("recycling");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleViewDetails = (facility) => {
    toast({
      title: facility.name,
      description: `Address: ${facility.address}\nContact: ${facility.contact}\nDistance: ${facility.distance}`,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: "Search functionality",
      description: "Search will be implemented in the next update.",
    });
  };

  // Filter facilities based on search query
  const filteredFacilities = {
    recyclingCenters: dummyFacilities.recyclingCenters.filter(
      (f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             f.address.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    biogasCompanies: dummyFacilities.biogasCompanies.filter(
      (f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             f.address.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    orphanages: dummyFacilities.orphanages.filter(
      (f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             f.address.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  return (
    <MainLayout>
      <div className="eco-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Nearby Facilities</h1>
          <p className="text-muted-foreground">
            Discover recycling centers, biogas companies, and orphanages near your event location
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by location or facility name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="eco-btn-primary">Search</Button>
          </form>
        </div>

        {/* Map Placeholder */}
        <Card className="eco-card mb-8 overflow-hidden">
          <div className="bg-muted aspect-[21/9] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-primary/50 mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive map will be available in the next update</p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </Card>

        {/* Facilities Tabs */}
        <Tabs defaultValue="recycling" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="recycling" className="flex items-center">
              <Recycle className="mr-2 h-4 w-4" />
              Recycling Centers
            </TabsTrigger>
            <TabsTrigger value="biogas" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Biogas Companies
            </TabsTrigger>
            <TabsTrigger value="orphanages" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Orphanages
            </TabsTrigger>
          </TabsList>

          {/* Recycling Centers Content */}
          <TabsContent value="recycling">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.recyclingCenters.length > 0 ? (
                filteredFacilities.recyclingCenters.map((facility) => (
                  <LocationCard
                    key={facility.id}
                    facility={facility}
                    icon={Recycle}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">No recycling centers found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Biogas Companies Content */}
          <TabsContent value="biogas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.biogasCompanies.length > 0 ? (
                filteredFacilities.biogasCompanies.map((facility) => (
                  <LocationCard
                    key={facility.id}
                    facility={facility}
                    icon={Building}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">No biogas companies found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Orphanages Content */}
          <TabsContent value="orphanages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.orphanages.length > 0 ? (
                filteredFacilities.orphanages.map((facility) => (
                  <LocationCard
                    key={facility.id}
                    facility={facility}
                    icon={Heart}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">No orphanages found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Locations;
