import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ResearchTasks from "./pages/ResearchTasks";
import Datasets from "./pages/Datasets";
import Tools from "./pages/Tools";
import Validators from "./pages/Validators";
import Incidents from "./pages/Incidents";
import IncidentDetail from "./pages/IncidentDetail";
import Papers from "./pages/Papers";
import Standards from "./pages/Standards";
import ScriptGenerator from "./pages/ScriptGenerator";
import LearningPath from "./pages/LearningPath";
import About from "./pages/About";
import Researchers from "./pages/Researchers";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <Navbar />
            <main className="flex-1 pt-14">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/research-tasks" element={<ResearchTasks />} />
                <Route path="/datasets" element={<Datasets />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/validators" element={<Validators />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/incidents/:id" element={<IncidentDetail />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/standards" element={<Standards />} />
                <Route path="/script-generator" element={<ScriptGenerator />} />
                <Route path="/learning-path" element={<LearningPath />} />
                <Route path="/researchers" element={<Researchers />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
