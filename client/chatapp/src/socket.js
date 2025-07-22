// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001", {
//   withCredentials: true,
// });

// export default socket;


import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // your backend address
export default socket;
