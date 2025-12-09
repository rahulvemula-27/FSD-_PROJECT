import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const habitAPI = {
  getAllHabits: async () => {
    const response = await api.get('/habits');
    return response.data;
  },

  getHabit: async (id) => {
    const response = await api.get(`/habits/${id}`);
    return response.data;
  },

  createHabit: async (habitData) => {
    const response = await api.post('/habits', {
      ...habitData,
      currentStreak: 0,
      completionDates: [],
      lastCompleted: null,
    });
    return response.data;
  },

  updateHabit: async (id, habitData) => {
    const response = await api.put(`/habits/${id}`, habitData);
    return response.data;
  },

  deleteHabit: async (id) => {
    const response = await api.delete(`/habits/${id}`);
    return response.data;
  },

  markHabitDone: async (id, habit) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (habit.completionDates.includes(today)) {
      return habit;
    }

    const updatedHabit = {
      ...habit,
      completionDates: [...habit.completionDates, today],
      currentStreak: habit.currentStreak + 1,
      lastCompleted: today,
    };

    const response = await api.put(`/habits/${id}`, updatedHabit);
    return response.data;
  },
};

export default api;