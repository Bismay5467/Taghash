import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/Home";
import StatsPage from "./components/Stats";
import "./App.css";

function App() {
  return (
    <>
      <h1>Vaccination Census System</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
