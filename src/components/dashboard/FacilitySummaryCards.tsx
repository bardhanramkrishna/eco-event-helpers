
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Recycle, Heart, Building } from "lucide-react";
import { Location } from "@/lib/supabase";

interface FacilitySummaryCardsProps {
  locations: Location[];
}

const FacilitySummaryCards = ({ locations }: FacilitySummaryCardsProps) => {
  const recyclingCount = locations.filter(l => l.type === 'recycling').length;
  const orphanageCount = locations.filter(l => l.type === 'orphanage').length;
  const biogasCount = locations.filter(l => l.type === 'biogas').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <p className="text-3xl font-bold">{recyclingCount}</p>
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
          <p className="text-3xl font-bold">{orphanageCount}</p>
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
          <p className="text-3xl font-bold">{biogasCount}</p>
          <p className="text-muted-foreground text-sm">For organic waste</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilitySummaryCards;
