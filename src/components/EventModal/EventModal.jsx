import React, {useState} from "react";
import "./EventModal.css";

function formatDateString(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}


function EventModal({ event, onJoinEvent, onLeaveEvent, onClose }) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [registrationError, setRegistrationError] = useState(null);

    const handleJoinEvent = async () => {
        try {
            await onJoinEvent(event);
            setIsRegistered(true);
            setRegistrationError(null);
        } catch (error) {
            setRegistrationError(error.message);
        }
    };


    return (
        <div className="event-modal">
            <div className="event-modal-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>Дата: {formatDateString(event.date)}</p>
                {isRegistered ? (
                    <p>Вы уже зарегистрированы на это мероприятие.</p>
                ) : (
                    <>
                        <div className="buttons">
                            <button onClick={handleJoinEvent}>Присоединиться</button>
                            <button onClick={() => onLeaveEvent(event)}>Покинуть</button>
                        </div>
                        {registrationError && <p>{registrationError}</p>}
                    </>
                )}
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );

}

export default EventModal;
