
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, AlertCircle } from "lucide-react";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { LocationType } from "@/lib/supabase";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LocationMapProps {
  location?: string;
  height?: string;
  showPlaceholder?: boolean;
  locationType?: LocationType;
}

const LocationMap = ({ 
  location, 
  height = "400px", 
  showPlaceholder = true,
  locationType
}: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const { 
    locations, 
    loading: locationsLoading, 
    error: locationsError,
    pagination,
    nextPage,
    prevPage
  } = useNearbyLocations(location, locationType);

  useEffect(() => {
    // In a real implementation, this would initialize the Google Maps API
    // and place markers for each location
    
    // For this demo, we'll just simulate loading
    const timer = setTimeout(() => {
      if (location) {
        setIsLoading(false);
      } else if (showPlaceholder) {
        setMapError("Please enter a location to view the map.");
        setIsLoading(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location, showPlaceholder]);

  const isLoaded = !isLoading && !locationsLoading;

  return (
    <Card className="overflow-hidden">
      <div style={{ height }} className="relative">
        {!isLoaded ? (
          <Skeleton className="h-full w-full" />
        ) : mapError ? (
          <div className="flex items-center justify-center h-full bg-muted">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{mapError}</p>
            </div>
          </div>
        ) : (
          <div className="h-full bg-muted flex flex-col items-center justify-center">
            {locationsError ? (
              <Alert variant="destructive" className="max-w-md mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{locationsError}</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="font-medium">Map showing: {location}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (In a real implementation, this would display a Google Map centered on this location)
                  </p>
                  {locations.length > 0 && (
                    <p className="text-sm mt-2">
                      <span className="font-medium">{pagination.totalCount}</span> {locationType || 'waste management'} 
                      {locationType ? ' facilities' : ' locations'} found in this area
                      <br />
                      <span className="text-xs text-muted-foreground">
                        Showing {(pagination.page - 1) * pagination.pageSize + 1}-
                        {Math.min(pagination.page * pagination.pageSize, pagination.totalCount)} of {pagination.totalCount}
                      </span>
                    </p>
                  )}
                </div>
                
                {pagination.totalPages > 1 && (
                  <Pagination className="mt-auto mb-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={prevPage} 
                          className={pagination.page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: pagination.totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink isActive={pagination.page === i + 1}>
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )).slice(Math.max(0, pagination.page - 3), Math.min(pagination.totalPages, pagination.page + 2))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={nextPage} 
                          className={pagination.page >= pagination.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default LocationMap;
