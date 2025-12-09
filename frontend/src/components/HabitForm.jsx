import React, { useState } from 'react';

const HabitForm = ({ initialData, onSubmit, onCancel, isEdit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      category: 'Health',
      frequency: 'Daily',
      targetCount: 30,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a habit name');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEdit ? 'Edit Habit' : 'Create New Habit'}
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Habit Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Morning Exercise"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Health">Health</option>
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Personal">Personal</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Frequency</label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Target Count (Days)</label>
          <input
            type="number"
            value={formData.targetCount}
            onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 30"
            min="1"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {isEdit ? 'Update Habit' : 'Create Habit'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitForm;