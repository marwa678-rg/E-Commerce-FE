import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";
import { PublicNavbar } from "./Components/PublicNavbar/PublicNavbar";

function App() {
  return (
    <>
<Toaster position="top-left" />
<PublicNavbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
