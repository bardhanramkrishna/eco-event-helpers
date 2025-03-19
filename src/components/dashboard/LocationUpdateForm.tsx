
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Location update schema
const locationSchema = z.object({
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
});

const LocationUpdateForm = () => {
  const { user, updateLocation } = useAuth();
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: user?.location || "",
    },
  });

  const handleUpdateLocation = async (values: z.infer<typeof locationSchema>) => {
    try {
      setIsUpdatingLocation(true);
      await updateLocation(values.location);
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  return (
    <Card className="eco-card mb-8">
      <CardHeader>
        <CardTitle>Your Event Location</CardTitle>
        <CardDescription>Update your location to find nearby waste management facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...locationForm}>
          <form onSubmit={locationForm.handleSubmit(handleUpdateLocation)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={locationForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Enter city or address" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="self-end min-w-32" 
                disabled={isUpdatingLocation || !locationForm.formState.isDirty}
              >
                {isUpdatingLocation ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Location
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LocationUpdateForm;
