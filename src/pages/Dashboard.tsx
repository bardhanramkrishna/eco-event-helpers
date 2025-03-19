
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";
import { LocationType } from "@/lib/supabase";

// Import refactored components
import LocationUpdateForm from "@/components/dashboard/LocationUpdateForm";
import FacilitySummaryCards from "@/components/dashboard/FacilitySummaryCards";
import LocationMapSection from "@/components/dashboard/LocationMapSection";
import WasteCategorization from "@/components/dashboard/WasteCategorization";

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<LocationType | "all">("all");
  const { locations } = useNearbyLocations(user?.location, activeCategory !== "all" ? activeCategory as LocationType : undefined);

  const handleCreateEvent = () => {
    toast({
      title: "Coming Soon!",
      description: "Event creation will be available in the next update.",
    });
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

        {/* Location Update Form Component */}
        <LocationUpdateForm />

        {/* Facility Summary Cards Component */}
        <FacilitySummaryCards locations={locations} />

        {/* Location Map Section Component */}
        <LocationMapSection location={user?.location} />

        {/* Waste Categorization Component */}
        <WasteCategorization 
          locations={locations}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
