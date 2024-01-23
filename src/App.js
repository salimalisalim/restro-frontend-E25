import About from "./components/About";
import AddRestaurant from "./components/AddRestaurant";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantDetails from "./components/RestaurantDetails";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import Users from "./components/Users";
import EditUser from "./components/EditUser";

function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
       <Header/>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/details/:id" element={<RestaurantDetails/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/add" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddRestaurant/></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Users/></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><EditUser/></ProtectedRoute>} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
