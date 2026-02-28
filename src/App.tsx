import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import DashboardHome from "./pages/DashboardHome";
import Appointments from "./pages/Appointments";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />
          <Route path="/dashboard/reviews" element={<Reviews />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/about" element={<About />} />
          <Route path="/dashboard/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
