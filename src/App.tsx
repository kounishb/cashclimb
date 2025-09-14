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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Navigation */}
            <Route path="/" element={<><Navigation /><Home /></>} />
            <Route path="/about" element={<><Navigation /><About /></>} />
            <Route path="/product" element={<><Navigation /><Product /></>} />
            <Route path="/contact" element={<><Navigation /><Contact /></>} />
            <Route path="/auth" element={<><Navigation /><Auth /></>} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <><Navigation /><Profile /></>
                </ProtectedRoute>
              } 
            />
            
            {/* Dashboard Routes */}
            <Route 
              path="/game" 
              element={
                <ProtectedRoute>
                  <><Navigation /><GameStart /></>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/game-start" 
              element={
                <ProtectedRoute>
                  <><Navigation /><GameStart /></>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/grade/:gradeId" 
              element={
                <ProtectedRoute>
                  <><Navigation /><GradeModules /></>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/curriculum/:gradeId" 
              element={
                <ProtectedRoute>
                  <><Navigation /><Curriculum /></>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/education/grade/:gradeId" 
              element={
                <ProtectedRoute>
                  <><Navigation /><GradeModules /></>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/education/grade/:gradeId/module/:moduleId" 
              element={
                <ProtectedRoute>
                  <><Navigation /><LessonViewer /></>
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<><Navigation /><NotFound /></>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
