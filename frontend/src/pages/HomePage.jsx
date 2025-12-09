import React, { useState, useEffect } from 'react';
import { habitAPI } from '../services/api';
import HabitCard from '../components/HabitCard';
import { Target } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const data = await habitAPI.getAllHabits();
      setHabits(data);
    } catch (error) {
      toast.error('Failed to fetch habits');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isCompletedToday = (habit) => {
    const today = getTodayString();
    return habit.completionDates?.includes(today);
  };

  const handleMarkDone = async (habit) => {
    if (isCompletedToday(habit)) {
      toast.info('Already completed today!');
      return;
    }

    try {
      await habitAPI.markHabitDone(habit.id, habit);
      toast.success('Habit marked as done! 🎉');
      fetchHabits();
    } catch (error) {
      toast.error('Failed to mark habit as done');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await habitAPI.deleteHabit(id);
        toast.success('Habit deleted successfully');
        fetchHabits();
      } catch (error) {
        toast.error('Failed to delete habit');
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Habits</h2>
        <p className="text-gray-600 mt-2">
          Track your daily progress and build consistency
        </p>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-16">
          <Target size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No habits yet
          </h3>
          <p className="text-gray-500 mb-4">Start building better habits today!</p>
          <button
            onClick={() => navigate('/add')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Create Your First Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onMarkDone={handleMarkDone}
              onDelete={handleDelete}
              isCompletedToday={isCompletedToday(habit)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;