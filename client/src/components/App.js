import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongGame from "./SongGame";
import Home from "./Home";
import GlobalStyles from "../GlobalStyles";
import Answer from "./Answer";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genre" element={<SongGame />} />
        <Route path="/song/:genre/:songName" element={<Answer />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
