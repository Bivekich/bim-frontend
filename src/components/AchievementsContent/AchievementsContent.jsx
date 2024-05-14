import { useState } from 'react';
import './AchievementsContent.css';

function AchievementsContent() {
    const [achievements, setAchievements] = useState([
        { id: 1, title: 'Достижение 1', description: 'Описание достижения 1' },
        { id: 2, title: 'Достижение 2', description: 'Описание достижения 2' },
        { id: 3, title: 'Достижение 3', description: 'Описание достижения 3' }
    ]);


    return (
        <div className="achievements-container">
            <h2>Достижения</h2>
            <div className="achievements-list">
                {achievements.map(item => (
                    <div key={item.id} className="achievement-item">
                        <div className="achievement-details">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AchievementsContent;
