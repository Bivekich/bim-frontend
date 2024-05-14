import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {email, password})
      const userId = response.data.userId;
      localStorage.setItem('userId', userId)
  } catch (error) {
      throw error.response.data;
  }
}

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, { email, password });
        return response.data; // Возвращаем данные, которые пришли от сервера
    } catch (error) {
        throw error.response.data; // Если произошла ошибка, выбрасываем её с данными ошибки
    }
};

// Создание мероприятия
export const createEvent = async (title, description, date) => {
    try {
        const response = await axios.post(`${BASE_URL}/events`, { title, description, date });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Получение списка всех мероприятий
export const getEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Получение информации о конкретном мероприятии
export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/events/${eventId}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Обновление информации о мероприятии
export const updateEvent = async (eventId, title, description, date) => {
    try {
        const response = await axios.put(`${BASE_URL}/events/${eventId}`, { title, description, date });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Удаление мероприятия
export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/events/${eventId}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Добавление участника к мероприятию
export const addParticipant = async (eventId, userId) => {
    try {
        const response = await axios.post(`${BASE_URL}/events/${eventId}/participants`, { userId });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Удаление участника из мероприятия
export const removeParticipant = async (eventId, userId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/events/${eventId}/participants/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Получение списка участников мероприятия
export const getEventParticipants = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/events/${eventId}/participants`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};