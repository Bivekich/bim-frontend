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

export const getCoworkingSpaces = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/coworking`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const bookCoworking = async (coworkingId, userId, date, startTime, endTime) => {
    try {
        const response = await axios.post(`${BASE_URL}/coworking/book`, {
            coworkingId,
            userId,
            date,
            startTime,
            endTime
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Функция для отмены бронирования коворкинга
export const cancelBooking = async (bookingId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/coworking/cancel/${bookingId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Получение всех записей пользователя
export const getUserBookings = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/coworking/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Получение списка новостей
export const getNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/news`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Создание новости
export const createNews = async (title, content) => {
    try {
        const response = await axios.post(`${BASE_URL}/news`, { title, content });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Удаление новости по её ID
export const deleteNews = async (newsId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/news/${newsId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};