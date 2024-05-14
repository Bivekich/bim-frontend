import {useEffect, useState} from 'react';
import {bookCoworking, cancelBooking, getCoworkingSpaces, getUserBookings} from '../../api/api'; // Подставьте свои функции для бронирования и отмены бронирования
import './BookingContent.css';

function BookingContent() {
    const [coworkingId, setCoworkingId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const [cancelBookingId, setCancelBookingId] = useState('');
    const [coworkingSpaces, setCoworkingSpaces] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUserBookings(storedUserId);
        }

        fetchCoworkingSpaces();
    }, []);

    const fetchUserBookings = async (userId) => {
        try {
            const bookings = await getUserBookings(userId);
            setUserBookings(bookings);
        } catch (error) {
            console.error('Ошибка при получении списка бронирований пользователя:', error);
        }
    };

    const fetchCoworkingSpaces = async () => {
        try {
            const spaces = await getCoworkingSpaces();
            setCoworkingSpaces(spaces);
        } catch (error) {
            console.error('Ошибка при получении списка коворкингов:', error);
        }
    };

    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateTimeString).toLocaleString('ru-RU', options);
    };

    const handleBookCoworking = async () => {
        try {
            await bookCoworking(coworkingId, userId, date, startTime, endTime);
            setBookingMessage('Коворкинг успешно забронирован');
            fetchUserBookings(userId);
        } catch (error) {
            setBookingMessage(error.message);
            console.error('Ошибка при бронировании коворкинга:', error);
        }
    };

    const handleCancelBooking = async () => {
        try {
            await cancelBooking(cancelBookingId);
            setCancelBookingId('');
            fetchUserBookings(userId);
        } catch (error) {
            console.error('Ошибка при отмене бронирования:', error);
        }
    };

    return (
        <div className="booking-content">
            <h2>Текущие бронирования</h2>
            <ul>
                {userBookings.map(booking => (
                    <li key={booking.id}>ID бронирования: {booking.id} - Дата: {formatDateTime(booking.date)} - Время
                        начала: {booking.start_time} - Время
                        окончания: {booking.end_time}</li>
                ))}
            </ul>
            <h2>Бронирование коворкинга</h2>
            <input type="text" placeholder="ID коворкинга" value={coworkingId}
                   onChange={(e) => setCoworkingId(e.target.value)}/>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
            <button onClick={handleBookCoworking}>Забронировать</button>
            {bookingMessage && <p>{bookingMessage}</p>}
            <h2>Отмена бронирования</h2>
            <input type="text" placeholder="ID бронирования" value={cancelBookingId}
                   onChange={(e) => setCancelBookingId(e.target.value)}/>
            <button onClick={handleCancelBooking}>Отменить бронирование</button>
            <h2>Список коворкингов</h2>
            <ul>
                {coworkingSpaces.map(space => (
                    <li key={space.id}>ID: {space.id} - {space.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default BookingContent;
