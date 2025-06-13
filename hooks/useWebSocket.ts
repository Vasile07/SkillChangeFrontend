import {useRef} from 'react';
import {Client, IMessage} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import MessageView from "@/datas/MessageView";

interface UseWebSocket {
    connect: (jwt: string, onMessage: (data: MessageView) => void) => void;
    disconnect: () => void;
}

export function useWebSocket(): UseWebSocket {
    const clientRef = useRef<Client | null>(null);

    const connect = (jwt: string, onMessage: (data: MessageView) => void): void => {
        const socket = new SockJS('http://localhost:8080/ws/websocket');  // Use SockJS here

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/user/${jwt}/notifications`, (message: IMessage) => {
                    if (message.body) {
                        try {
                            const data: MessageView = JSON.parse(message.body);
                            onMessage(data);
                        } catch (e) {
                            console.error('Failed to parse WebSocket message:', e);
                        }
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker error:', frame.headers['message']);
                console.error('Details:', frame.body);
            },
        });

        client.activate();
        clientRef.current = client;
    };

    const disconnect = (): void => {
        if (clientRef.current) {
            clientRef.current.deactivate();
            clientRef.current = null;
        }
    };

    return {connect, disconnect};
}
