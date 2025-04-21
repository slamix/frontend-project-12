import { io } from 'socket.io-client';


const socket = io('https://slack-chat-oen3.onrender.com');
// const socket = io('http://0.0.0.0:5001');


export default socket;