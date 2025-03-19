import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Form validation schemas
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  location: z.string().min(3, { message: "Please enter your event location" }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["event_manager", "individual"], { 
    required_error: "Please select a role" 
  }),
  location: z.string().min(3, { message: "Please enter your event location" }),
});

const Auth = () => {
  const [activeTab, setActiveTab] = useState("sign-in");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  // Sign In Form
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      location: "",
    },
  });

  // Sign Up Form
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      location: "",
    },
  });

  const onSignInSubmit = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password, values.location);
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setLoading(false);
    }
  };

  const onSignUpSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      await signUp(values.email, values.password, {
        name: values.name,
        role: values.role,
        location: values.location,
      });
      setActiveTab("sign-in");
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="eco-container py-12 md:py-20 flex items-center justify-center">
        <Card className="eco-card w-full max-w-md">
          <Tabs defaultValue="sign-in" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Sign In Form */}
            <TabsContent value="sign-in">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your email to receive a magic link</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signInForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input placeholder="Enter your event location" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="eco-btn-primary w-full" 
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Magic Link"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
            
            {/* Sign Up Form */}
            <TabsContent value="sign-up">
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your details to create an account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                    <FormField
                      control={signUpForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="event_manager">Event Manager</SelectItem>
                              <SelectItem value="individual">Individual</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input placeholder="Enter your event location" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="eco-btn-primary w-full" 
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex justify-center border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Auth;
