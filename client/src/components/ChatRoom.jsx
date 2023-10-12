import  { useState, useEffect } from "react";
import io from 'socket.io-client';

const ChatRoom = () => {
    const [socket] = useState(() => io("http://0.0.0.0:4000")); // Replace with your server URL

    const [inputMessage, setInputMessage] = useState('');

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for "new_message_from_server" event and update messages state
        socket.on("new_message_from_server", (msg) => {
            setMessages(prevMessages => [msg, ...prevMessages]);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const sendMessage = () => {
        if (inputMessage.trim() !== "") {
            // Emit a "new_message_from_client" event to the server
            socket.emit("new_message_from_client", inputMessage);
            setInputMessage(""); // Clear the input field after sending the message
        }
    };

    return (
        <div className="scrollable_container">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="bottom-action">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
