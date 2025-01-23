import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/navbar/NavbarComponent';
import ListingsComponent from './components/listing/ListingComponent';
import ListingDetailComponent from './components/listing/ListingDetailComponent';
import MyListingsPage from "./components/listing/MyListingsPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar displayed on all pages */}
        <NavbarComponent />

        <Routes>
          {/* Route for homepage listing */}
          <Route path="/" element={<ListingsComponent />} />
          
          {/* Route for listing details */}
          <Route path="/listing/:listingId" element={<ListingDetailComponent />} />
          
          {/* Route for user-specific listings */}
          <Route path="/my-listings" element={<MyListingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;