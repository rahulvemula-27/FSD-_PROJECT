import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddHabitPage from './pages/AddHabitPage';
import EditHabitPage from './pages/EditHabitPage';
import HabitDetailsPage from './pages/HabitDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddHabitPage />} />
          <Route path="/edit/:id" element={<EditHabitPage />} />
          <Route path="/details/:id" element={<HabitDetailsPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;