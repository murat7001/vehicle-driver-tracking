import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Vehicles } from "./pages/Vehicles";
import { Drivers } from "./pages/Drivers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/drivers" element={<Drivers />} />
    </Routes>
  );
}

export default App;
