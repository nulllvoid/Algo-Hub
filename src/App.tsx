import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Workspace } from "./pages/Workspace";

function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pattern/:variationId" element={<Workspace />} />
      </Routes>
    </div>
  );
}

export default App;
