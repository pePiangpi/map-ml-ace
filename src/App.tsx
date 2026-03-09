import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LearningProvider } from "@/context/LearningContext";
import Index from "./pages/Index";
import LayerPage from "./pages/LayerPage";
import ServicePage from "./pages/ServicePage";
import PipelineExplorer from "./pages/PipelineExplorer";
import ExamPage from "./pages/ExamPage";
import PatternsPage from "./pages/PatternsPage";
import ComparePage from "./pages/ComparePage";
import ServicesDirectory from "./pages/ServicesDirectory";
import InferenceVisualizer from "./pages/InferenceVisualizer";
import ScenariosPage from "./pages/ScenariosPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LearningProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/layers/:layerId" element={<LayerPage />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/pipeline-explorer" element={<PipelineExplorer />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/patterns" element={<PatternsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/services" element={<ServicesDirectory />} />
            <Route path="/visualizer" element={<InferenceVisualizer />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LearningProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
