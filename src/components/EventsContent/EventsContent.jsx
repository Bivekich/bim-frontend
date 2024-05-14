import { useEffect, useState } from "react";
import { addParticipant, getEventParticipants, getEvents, removeParticipant } from "../../api/api.js";
import './EventsContent.css';
import EventModal from "../EventModal/EventModal.jsx"; // Импорт стилей

function EventsContent() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [userId, setUserId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }

        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const eventsData = await getEvents();
            setEvents(eventsData);
        } catch (error) {
            console.error('Ошибка при получении списка мероприятий:', error);
        }
    };

    const handleEventSelect = async (event) => {
        setSelectedEvent(event);
        try {
            const participantsData = await getEventParticipants(event.id);
            setParticipants(participantsData);
        } catch (error) {
            console.error('Ошибка при получении списка участников мероприятия:', error);
        }
        setIsModalOpen(true)
    };

    const handleJoinEvent = async () => {
        if (!selectedEvent) return;
        try {
            await addParticipant(selectedEvent.id, userId);
            const updatedParticipantsData = await getEventParticipants(selectedEvent.id);
            setParticipants(updatedParticipantsData);
        } catch (error) {
            console.error('Ошибка при добавлении участника к мероприятию:', error);
        }
    };

    const handleLeaveEvent = async () => {
        if (!selectedEvent) return;
        try {
            await removeParticipant(selectedEvent.id, userId);
            const updatedParticipantsData = await getEventParticipants(selectedEvent.id);
            setParticipants(updatedParticipantsData);
        } catch (error) {
            console.error('Ошибка при удалении участника из мероприятия:', error);
        }
        setIsModalOpen(false)
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="EventsContent">
            <h2>Мероприятия</h2>
            <ul className="EventsList">
                {events.map(event => (
                    <li key={event.id}>
                        <button onClick={() => handleEventSelect(event)}>{event.title}</button>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <EventModal
                    event={selectedEvent}
                    onJoinEvent={handleJoinEvent}
                    onLeaveEvent={handleLeaveEvent}
                    onClose={closeModal}
                />
            )}
        </div>
    )
}

export default EventsContent;
