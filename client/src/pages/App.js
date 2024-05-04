import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongGame from "./SongGame";
import Home from "./Home";
import GlobalStyles from "../GlobalStyles";
import Answer from "./Answer";
import NavBar from "../components/NavBar";
import SongProvider from "../context/SongContext";

const App = () => {
  return (
    <SongProvider>
      <Router>
        <GlobalStyles />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre/:genre" element={<SongGame />} />
          <Route path="/answer/:genre" element={<Answer />} />
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </Router>
    </SongProvider>
  );
};

export default App;

// https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
