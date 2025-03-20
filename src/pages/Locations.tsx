import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Recycle, Heart, Building, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { Location as FacilityLocation, LocationType } from "@/lib/supabase";
import LocationMap from "@/components/maps/LocationMap";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const { 
    locations, 
    loading, 
    error,
    pagination,
    nextPage,
    prevPage,
    setPageSize,
    refresh
  } = useNearbyLocations(user?.location, activeTab);

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

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2 flex-grow">
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
          
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Items per page:</span>
            <Select 
              value={pagination.pageSize.toString()} 
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder="6" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: pagination.pageSize }).map((_, index) => (
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
            
            {!loading && filteredLocations.length > 0 && pagination.totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={prevPage} 
                      className={pagination.page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                    const pagesToShow = Math.min(5, pagination.totalPages);
                    const halfPagesToShow = Math.floor(pagesToShow / 2);
                    let startPage = Math.max(1, pagination.page - halfPagesToShow);
                    const endPage = Math.min(pagination.totalPages, startPage + pagesToShow - 1);
                    
                    if (endPage - startPage + 1 < pagesToShow) {
                      startPage = Math.max(1, endPage - pagesToShow + 1);
                    }
                    
                    const pageNumber = startPage + i;
                    if (pageNumber <= endPage) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            isActive={pagination.page === pageNumber}
                            onClick={() => {
                              if (pagination.page !== pageNumber) {
                                const diff = pageNumber - pagination.page;
                                if (diff > 0) {
                                  for (let i = 0; i < diff; i++) nextPage();
                                } else {
                                  for (let i = 0; i < Math.abs(diff); i++) prevPage();
                                }
                              }
                            }}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={nextPage} 
                      className={pagination.page >= pagination.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Locations;
