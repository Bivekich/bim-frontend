import React, { useEffect, useState } from 'react';
import './ChatContent.css';

function ChatContent() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Создаем WebSocket соединение при монтировании компонента
        const newWs = new WebSocket('ws://localhost:3000'); // Замените на ваш реальный адрес WebSocket сервера

        newWs.onopen = () => {
            console.log('WebSocket connected');
        };

        newWs.onerror = (error) => {
            console.error('Произошла ошибка:', error);
        };


        newWs.onmessage = (event) => {
            // Обработка входящего сообщения
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        setWs(newWs);

        return () => {
            // Закрываем соединение при размонтировании компонента
            newWs.close();
        };
    }, []);

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const message = {
            id: Math.random().toString(36).substring(2), // Генерируем уникальный ID для сообщения
            text: inputMessage.trim(),
            timestamp: new Date().toISOString(),
        };

        // Отправляем сообщение через WebSocket
        ws.send(JSON.stringify(message));

        // Очищаем поле ввода сообщения
        setInputMessage('');
    };

    return (
        <div className="chat-content">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <span className="message-text">{message.text}</span>
                        <span className="message-timestamp">{message.timestamp}</span>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
}

export default ChatContent;
