
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/hooks/useAuth";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {user && user.location && (
          <div className="bg-primary/10 py-2 text-center">
            <p className="text-sm">
              <span className="font-medium">Current Location:</span> {user.location}
            </p>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
