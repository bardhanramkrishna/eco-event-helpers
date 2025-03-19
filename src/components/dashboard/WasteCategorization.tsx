
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recycle, Heart, Building } from "lucide-react";
import { Location, LocationType } from "@/lib/supabase";

// Waste category data
const wasteCategories = [
  { id: "recycling", name: "Recyclable Waste", icon: Recycle, color: "text-blue-500" },
  { id: "orphanage", name: "Leftover Food", icon: Heart, color: "text-red-500" },
  { id: "biogas", name: "Organic Waste", icon: Building, color: "text-green-500" }
];

interface WasteCategorizationProps {
  locations: Location[];
  activeCategory: LocationType | "all";
  setActiveCategory: (category: LocationType | "all") => void;
}

const WasteCategorization = ({ 
  locations, 
  activeCategory, 
  setActiveCategory 
}: WasteCategorizationProps) => {
  return (
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
  );
};

export default WasteCategorization;
