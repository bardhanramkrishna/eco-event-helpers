
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

interface LocationMapProps {
  location?: string;
  height?: string;
  showPlaceholder?: boolean;
}

const LocationMap = ({ location, height = "400px", showPlaceholder = true }: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would initialize the Google Maps API
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

  return (
    <Card className="overflow-hidden">
      <div style={{ height }} className="relative">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : mapError ? (
          <div className="flex items-center justify-center h-full bg-muted">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{mapError}</p>
            </div>
          </div>
        ) : (
          <div className="h-full bg-muted flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="font-medium">Map showing: {location}</p>
              <p className="text-sm text-muted-foreground mt-2">
                (In a real implementation, this would display a Google Map centered on this location)
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LocationMap;
