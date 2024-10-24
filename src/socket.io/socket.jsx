import { io } from 'socket.io-client';

// const socket = io('http://localhost:3000', {
//     transports: ['websocket'],
//     withCredentials: true,
// });

const socket = io('https://iti-graduation-back-end-production.up.railway.app/', {
    transports: ['websocket'],
    withCredentials: true,
});


export default socket;

