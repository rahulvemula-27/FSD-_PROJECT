import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Plus } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition">
            <TrendingUp size={28} />
            Habit Tracker
          </Link>
          <Link
            to="/add"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-50 transition"
          >
            <Plus size={20} />
            Add Habit
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;