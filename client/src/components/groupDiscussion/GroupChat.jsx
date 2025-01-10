import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import { io } from "socket.io-client";

function GroupChat({ eventId }) {
    const [comments, setComments] = useState([]);
    const socketRef = useRef(null); // To persist socket instance across renders

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/user/comments?eventId=${eventId}`,
                    { withCredentials: true }
                );
                console.log("Messages from history: ", res.data);
                setComments(res.data);
            } catch (err) {
                console.error("Error fetching comments: ", err);
            }
        };

        const setupSocket = async () => {
            try {
                // Fetch or generate socket token
                let socketToken = Cookies.get("socket_token");
                if (!socketToken) {
                    await axios.post(
                        "http://localhost:3000/auth/SocketAuthToken",
                        {},
                        { withCredentials: true }
                    );
                    socketToken = Cookies.get("socket_token");
                }

                // Initialize socket connection
                const socket = io(`http://localhost:5000/comment?eventId=${eventId}`, {
                    auth: { token:  socketToken },
                });

                // Event listeners
                socket.on("getNewComment", (data) => {
                    console.log("New comment received: ", data);
                    setComments((prev) => [...prev, data]);
                });

                socket.on("commenterror", (data) => {
                    console.log("Socket error: ", data);
                });

                socketRef.current = socket; // Save socket instance
                console.log(socket);
            } catch (err) {
                console.error("Error setting up socket: ", err);
            }
        };

        fetchData();
        setupSocket();

        return () => {
            // Cleanup socket connection
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [eventId]);

    const NewComment = (comment) => {
        if (socketRef.current) {
            console.log("Sending new comment: ", comment);
            socketRef.current.emit("newComment", comment);
            console.log(comments);
        }
    };

    return (
        <div className="grid place-items-center">
            <div className="w-2/3 md:min-h-96 md:max-h-screen bg-pink-200 bg-opacity-50 p-4 overflow-y-auto border border-pink-500 rounded-md mb-2">
                {comments.map((comment, index) => (
                    <ChatItem key={index} comment={comment} />
                ))}
            </div>
            <div className="w-2/3 h-12">
                <ChatInput submitFunc={NewComment} />
            </div>
        </div>
    );
}

export default GroupChat;
