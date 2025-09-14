import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import GameStart from "./pages/GameStart";
import GradeModules from "./pages/GradeModules";
import LessonViewer from "./pages/LessonViewer";
import Curriculum from "./pages/Curriculum";
import Game from "./pages/Game";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/game" 
              element={
                <ProtectedRoute>
                  <GameStart />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/game-start" 
              element={
                <ProtectedRoute>
                  <GameStart />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/grade/:gradeId" 
              element={
                <ProtectedRoute>
                  <GradeModules />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/curriculum/:gradeId" 
              element={
                <ProtectedRoute>
                  <Curriculum />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/education/grade/:gradeId" 
              element={
                <ProtectedRoute>
                  <GradeModules />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/education/grade/:gradeId/module/:moduleId" 
              element={
                <ProtectedRoute>
                  <LessonViewer />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
