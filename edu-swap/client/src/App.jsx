import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAppContext from "./context/AppContext";

const App = () => {
  const { user } = useAppContext();
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Home /> : <Login />} />
    </Routes>
  );
  return (
    <div>
      <Navbar />
      {routes}
      {/* !Toaster */}
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
