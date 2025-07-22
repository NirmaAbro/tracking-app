// import { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001");

// export default function ChatBox({ name, role }) {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     socket.emit("join", { name, role });

//     socket.on("chatMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() === "") return;

//     const newMessage = { text: message, senderName: name, role };
//     socket.emit("chatMessage", newMessage);
//     setMessages((prev) => [...prev, newMessage]);
//     setMessage("");
//   };

//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md h-[600px] bg-white shadow-lg rounded-lg flex flex-col">
//         <div className="bg-blue-600 text-white text-lg font-bold p-4 rounded-t-lg">
//           🟢 Chat (Logged in as {role})
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.role === role ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
//                   msg.role === role
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 <div className="text-sm font-semibold">{msg.senderName}</div>
//                 <div>{msg.text}</div>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <form onSubmit={sendMessage} className="flex p-3 border-t gap-2">
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 border rounded-md outline-none"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// // Connect to Socket.IO backend
// const socket = io("http://localhost:3001");

// function ChatBox() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const name = localStorage.getItem("name") || "Anonymous";
//   const role = localStorage.getItem("role") || "guest";
// // After login success
// localStorage.setItem("name", res.data.user.name); // ✅ store logged-in name
// localStorage.setItem("role", res.data.user.role); // ✅ store logged-in role

//   useEffect(() => {
//     socket.emit("join", { name, role });

//     socket.on("chatMessage", (msg) => {
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("chatMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msg = {
//       text: message,
//     };

//     socket.emit("chatMessage", msg);
//     setMessage("");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white shadow px-6 py-4 text-xl font-semibold text-gray-700">
//         Real-time Chat
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {chat.map((msg, idx) => {
//           const isMe = msg.senderName === name;
//           return (
//             <div
//               key={idx}
//               className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[70%] p-3 rounded-lg shadow ${
//                   isMe ? "bg-blue-100 text-right" : "bg-white text-left"
//                 }`}
//               >
//                 <div className="text-xs text-gray-500 font-semibold mb-1">
//                   {msg.senderName} ({msg.role})
//                 </div>
//                 <div className="text-sm text-gray-800">{msg.text}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Input */}
//       <div className="bg-white px-4 py-3 flex items-center gap-2 shadow-md">
//         <input
//           type="text"
//           value={message}
//           placeholder="Type your message..."
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

import React, { useEffect, useState, useRef, use } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  console.log("name, role", name, role); // now prints real values

  useEffect(() => {
    if (name && role) {
      socket.emit("join", { name, role });
    }

    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [name, role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    socket.emit("chatMessage", { text });
    setText("");
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
        Live Chat ({role}) – {name}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((msg, idx) => {
          const isMe = msg.senderName === name;
          return (
            <div
              key={idx}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow ${
                  isMe ? "bg-blue-100 text-right" : "bg-white text-left"
                }`}
              >
                <div className="text-xs text-gray-500 font-semibold mb-1">
                  {msg.senderName} ({msg.role})
                </div>
                <div className="text-sm text-gray-800">{msg.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center p-4 bg-white border-t gap-2"
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
        >
          Send
        </button>
      </form>
    </div>
  );
}
