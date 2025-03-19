
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import LocationMap from "@/components/maps/LocationMap";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { LocationType } from "@/lib/supabase";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LocationMapSectionProps {
  location?: string;
  locationType?: LocationType;
}

const LocationMapSection = ({ location, locationType }: LocationMapSectionProps) => {
  const { 
    locations, 
    loading, 
    error, 
    pagination, 
    fetchNextPage, 
    fetchPreviousPage, 
    setPage 
  } = useNearbyLocations(location, locationType, { page: 1, pageSize: 5 });

  return (
    <Card className="eco-card mb-8">
      <CardHeader>
        <CardTitle>Nearby Facilities</CardTitle>
        <CardDescription>
          Waste management facilities based on your location
          {location ? `: ${location}` : ''}
          {locationType ? ` (${locationType} facilities)` : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <LocationMap location={location} locationType={locationType} />
        
        {!loading && locations.length > 0 && pagination.totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={fetchPreviousPage} 
                    className={!pagination.hasPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={pagination.currentPage === page} 
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={fetchNextPage} 
                    className={!pagination.hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationMapSection;
