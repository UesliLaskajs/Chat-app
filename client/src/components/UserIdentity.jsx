import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserIdentity = () => {
    const [userName, setUserName] = useState("");
    const [userNameList, setUserNameList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        if (storedUserName) {
            try {
                setUserNameList(JSON.parse(storedUserName));
            } catch (error) {
                console.error("Error parsing JSON data:", error);
            }
        }
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (userName.trim() !== "") {
            const updatedItems = [...userNameList, userName];
            try {
                localStorage.setItem("username", JSON.stringify(updatedItems));
                setUserNameList(updatedItems);
                setUserName("");
                navigate("/chatroom");
            } catch (error) {
                console.error("Error storing JSON data:", error);
            }
        }
    };

    return (
        <>
            <div className="identifier_container">
                <div className="hero_text">Get started right now!</div>
                <div className="desc">
                    <p>I want to start chatting with the name...</p>
                </div>
                <div className="form_container">
                    <form onSubmit={onSubmitHandler}>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button>Start Chatting</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserIdentity;
