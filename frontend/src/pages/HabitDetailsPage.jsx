import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { habitAPI } from '../services/api';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const HabitDetailsPage = () => {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchHabit();
  }, [id]);

  const fetchHabit = async () => {
    try {
      const data = await habitAPI.getHabit(id);
      setHabit(data);
    } catch (error) {
      toast.error('Failed to fetch habit details');
      console.error(error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!habit) return null;

  const last7Days = habit.completionDates?.slice(-7) || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold"
      >
        ← Back to Habits
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{habit.name}</h2>
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full">
              {habit.category}
            </span>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-indigo-600">
              {habit.currentStreak}
            </div>
            <div className="text-gray-500">Day Streak</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-600 mb-1">Frequency</div>
            <div className="text-xl font-semibold">{habit.frequency}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-600 mb-1">Target</div>
            <div className="text-xl font-semibold">{habit.targetCount} days</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-600 mb-1">Total Completions</div>
            <div className="text-xl font-semibold">
              {habit.completionDates?.length || 0}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-600 mb-1">Last Completed</div>
            <div className="text-xl font-semibold">
              {habit.lastCompleted || 'Never'}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Last 7 Days Progress
          </h3>
          <div className="space-y-2">
            {last7Days.length > 0 ? (
              last7Days.map((date, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-green-50 p-3 rounded-lg"
                >
                  <CheckCircle className="text-green-500" size={24} />
                  <span className="font-medium text-gray-700">{date}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completions yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetailsPage;