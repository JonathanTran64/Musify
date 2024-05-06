import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongGame from "./SongGame";
import Home from "./Home";
import GlobalStyles from "../GlobalStyles";
import Answer from "./Answer";
import SongProvider from "../context/SongContext";

import axios from "axios";
import Login from "../components/Login";
import { Toaster } from "react-hot-toast";
import UserProvider from "../context/UserContext";
import Dashboard from "./Dashboard";

axios.defaults.baseURL = "https://musify-nctl.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserProvider>
      <SongProvider>
        <Router>
          <GlobalStyles />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/genre/:genre" element={<SongGame />} />
            <Route path="/answer/:genre" element={<Answer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Routes>
        </Router>
      </SongProvider>
    </UserProvider>
  );
};

export default App;

// https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
