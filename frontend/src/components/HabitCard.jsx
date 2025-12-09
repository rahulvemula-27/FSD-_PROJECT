import React from 'react';
import { CheckCircle, Edit2, Trash2, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HabitCard = ({ habit, onMarkDone, onDelete, isCompletedToday }) => {
  const navigate = useNavigate();

  const getProgressPercentage = () => {
    if (!habit.targetCount) return 0;
    return Math.min((habit.currentStreak / habit.targetCount) * 100, 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{habit.name}</h3>
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">
            {habit.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-indigo-600">{habit.currentStreak}</div>
          <div className="text-sm text-gray-500">day streak</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>
            {habit.targetCount ? `${habit.currentStreak}/${habit.targetCount} days` : 'No target'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Calendar size={16} />
        <span>{habit.frequency} • Last: {habit.lastCompleted || 'Never'}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onMarkDone(habit)}
          disabled={isCompletedToday}
          className={`flex-1 ${
            isCompletedToday ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          } text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition`}
        >
          <CheckCircle size={18} />
          {isCompletedToday ? 'Done' : 'Mark Done'}
        </button>
        <button
          onClick={() => navigate(`/details/${habit.id}`)}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => navigate(`/edit/${habit.id}`)}
          className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default HabitCard;