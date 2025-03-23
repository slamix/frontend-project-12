import { io } from 'socket.io-client';

const socket = io('https://slack-chat-oen3.onrender.com');

export default socket;