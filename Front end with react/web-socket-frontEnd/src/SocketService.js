// src/websocketService.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = null;
    }

    connect() {
        const socket = new SockJS('http://192.168.0.113:8080/ws');
        this.client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected');
                this.client.subscribe('/topic/first', (message) => {
                    console.log("***** socket message ******", message.body);
                });
            },
            onDisconnect: () => {
                alert("socket disconnected");
                console.log('Disconnected');
            },
        });

        this.client.activate();
    }

    sendMessage(message) {
        if (this.client && this.client.connected) {
            this.client.publish({
                destination: '/app/hello',
                body: message,
            });
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
