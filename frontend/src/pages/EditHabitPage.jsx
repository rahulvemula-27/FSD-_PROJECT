import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import { habitAPI } from '../services/api';
import { toast } from 'react-toastify';

const EditHabitPage = () => {
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
      toast.error('Failed to fetch habit');
      console.error(error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (habitData) => {
    try {
      await habitAPI.updateHabit(id, { ...habitData, id: parseInt(id) });
      toast.success('Habit updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update habit');
      console.error(error);
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <HabitForm
        initialData={habit}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        isEdit={true}
      />
    </div>
  );
};

export default EditHabitPage;