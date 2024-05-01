import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kpop from "./Kpop";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kpop" element={<Kpop />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
