import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<Jobs />} />
      </Routes>
    </div>
  );
}
