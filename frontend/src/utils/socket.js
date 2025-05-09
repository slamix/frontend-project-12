/* eslint-disable */

import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_PROD_ENV);
// const socket = io('process.env.REACT_APP_SOCKET_DEV_ENV');


export default socket;