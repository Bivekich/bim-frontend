import { useState } from 'react';
import './UserPanel.css';
import EventsContent from "../EventsContent/EventsContent.jsx";
import ChatContent from "../ChatContent/ChatContent.jsx";
import BookingContent from "../BookingContent/BookingContent.jsx";
import NewsContent from "../NewsContent/NewsContent.jsx";
import AchievementsContent from "../AchievementsContent/AchievementsContent.jsx";

function UserPanel({onLogout}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('Новости');


    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsMenuOpen(!isMenuOpen);
    };



    return (
        <div>
            <div className="top-bar">
                <div className="logo">
                    <span className="logo-text">BIM</span>
                </div>
                <div className="menu">
                    <button onClick={handleMenuToggle}>Меню</button>
                    {isMenuOpen && (
                        <div className="menu-items">
                            <button onClick={() => handleSectionClick('Новости')}>Новости</button>
                            <button onClick={() => handleSectionClick('Чаты')}>Чаты</button>
                            <button onClick={() => handleSectionClick('Бронирование')}>Бронирование</button>
                            <button onClick={() => handleSectionClick('Ачивки')}>Ачивки</button>
                            <button onClick={() => handleSectionClick('Мероприятия')}>Мероприятия</button>
                            <button onClick={onLogout}>Выйти</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="content">
                {selectedSection && (
                    <div className="section-content">
                        {selectedSection === 'Новости' && <NewsContent/>}
                        {selectedSection === 'Чаты' && <ChatContent/>}
                        {selectedSection === 'Бронирование' && <BookingContent/>}
                        {selectedSection === 'Ачивки' && <AchievementsContent/>}
                        {selectedSection === 'Мероприятия' && <EventsContent/>}
                    </div>
                )}
            </div>
        </div>

    );
}

export default UserPanel;
