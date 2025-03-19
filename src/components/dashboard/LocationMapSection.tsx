
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LocationMap from "@/components/maps/LocationMap";

interface LocationMapSectionProps {
  location?: string;
}

const LocationMapSection = ({ location }: LocationMapSectionProps) => {
  return (
    <Card className="eco-card mb-8">
      <CardHeader>
        <CardTitle>Nearby Facilities</CardTitle>
        <CardDescription>Waste management facilities based on your location</CardDescription>
      </CardHeader>
      <CardContent>
        <LocationMap location={location} />
      </CardContent>
    </Card>
  );
};

export default LocationMapSection;
