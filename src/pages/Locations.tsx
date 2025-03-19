
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Recycle, Heart, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { Location as FacilityLocation, LocationType } from "@/lib/supabase";
import LocationMap from "@/components/maps/LocationMap";

interface LocationCardProps {
  facility: FacilityLocation;
  icon: React.ElementType;
  onViewDetails: (facility: FacilityLocation) => void;
}

const LocationCard = ({ facility, icon: Icon, onViewDetails }: LocationCardProps) => (
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
              <span className="text-xs text-muted-foreground">{facility.city}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground">{facility.contact || 'No contact information'}</p>
        <Button size="sm" onClick={() => onViewDetails(facility)}>
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Locations = () => {
  const [activeTab, setActiveTab] = useState<LocationType>("recycling");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const { locations, loading } = useNearbyLocations(user?.location, activeTab);

  const handleViewDetails = (facility: FacilityLocation) => {
    toast({
      title: facility.name,
      description: `Address: ${facility.address}, ${facility.city}\nContact: ${facility.contact || 'Not available'}`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search functionality",
      description: "Full text search will be implemented in the next update.",
    });
  };

  // Filter locations based on search query if needed
  const filteredLocations = searchQuery.length > 2
    ? locations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  const getIconForType = (type: LocationType) => {
    switch (type) {
      case 'recycling':
        return Recycle;
      case 'biogas':
        return Building;
      case 'orphanage':
        return Heart;
      default:
        return MapPin;
    }
  };

  return (
    <MainLayout>
      <div className="eco-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Nearby Facilities</h1>
          <p className="text-muted-foreground">
            Discover recycling centers, biogas companies, and orphanages near your event location: {user?.location}
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

        {/* Map showing locations */}
        <Card className="eco-card mb-8 overflow-hidden">
          <CardHeader>
            <CardTitle>Nearby Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationMap 
              location={user?.location} 
              height="400px" 
              locationType={activeTab}
            />
          </CardContent>
        </Card>

        {/* Facilities Tabs */}
        <Tabs defaultValue="recycling" onValueChange={(value) => setActiveTab(value as LocationType)} value={activeTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="recycling" className="flex items-center">
              <Recycle className="mr-2 h-4 w-4" />
              Recycling Centers
            </TabsTrigger>
            <TabsTrigger value="biogas" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Biogas Companies
            </TabsTrigger>
            <TabsTrigger value="orphanage" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Orphanages
            </TabsTrigger>
          </TabsList>

          {/* Dynamic Content for all tabs */}
          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="eco-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-muted h-10 w-10 rounded-lg"></div>
                        <div className="space-y-2">
                          <div className="h-5 bg-muted rounded w-32"></div>
                          <div className="h-4 bg-muted rounded w-48"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredLocations.length > 0 ? (
                filteredLocations.map((facility) => (
                  <LocationCard
                    key={facility.id}
                    facility={facility}
                    icon={getIconForType(facility.type)}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">
                    No {activeTab} facilities found {searchQuery ? 'matching your search' : `near ${user?.location || 'your location'}`}.
                  </p>
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
