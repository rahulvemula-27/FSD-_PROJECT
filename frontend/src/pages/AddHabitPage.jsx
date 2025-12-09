import React from 'react';
import { useNavigate } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import { habitAPI } from '../services/api';
import { toast } from 'react-toastify';

const AddHabitPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (habitData) => {
    try {
      await habitAPI.createHabit(habitData);
      toast.success('Habit created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create habit');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <HabitForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        isEdit={false}
      />
    </div>
  );
};

export default AddHabitPage;