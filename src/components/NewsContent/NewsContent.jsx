import {useEffect, useState} from "react";
import { getNews, createNews, deleteNews } from "../../api/api";
import './NewsContent.css'


function NewsFeed() {
    const [news, setNews] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await getNews();
            response.sort((a, b) => b.id - a.id);
            setNews(response);
        } catch (error) {
            console.error('Ошибка при загрузке новостей:', error);
        }
    };

    const handleCreateNews = async () => {
        try {
            await createNews(newTitle, newContent);
            fetchNews();
            setNewTitle('');
            setNewContent('');
        } catch (error) {
            console.error('Ошибка при создании новости:', error);
        }
    };

    const handleDeleteNews = async (id) => {
        try {
            await deleteNews(id);
            fetchNews();
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
        }
    };


    return (
        <div className="news-container">
            <h2>Лента новостей</h2>

            <div className="new-news-section">
                <h2>Создать новую новость</h2>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                    placeholder="Содержание"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                ></textarea>
                <button onClick={handleCreateNews}>Создать</button>
            </div>

            <ul className="news-list">
                {news.map(item => (
                    <li key={item.id} className="news-item">
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                        <button onClick={() => handleDeleteNews(item.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsFeed;
