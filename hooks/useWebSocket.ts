import {useRef} from 'react';
import {Client, IMessage} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import MessageView from '@/datas/MessageView';
import MeetingNotification from '@/datas/MeetingNotification';

interface UseWebSocket {
    messages: {
        connect: (jwt: string, onMessage: (data: MessageView) => void) => void;
        disconnect: () => void;
    };
    meetNotification: {
        connect: (jwt: string, onNotification: (data: MeetingNotification) => void) => void;
        disconnect: () => void;
    };
}

export function useWebSocket(): UseWebSocket {
    const messageClientRef = useRef<Client | null>(null);
    const meetClientRef = useRef<Client | null>(null);

    const createClient = (endpoint: string, topic: string, jwt: string, onData: (data: any) => void): Client => {
        const socket = new SockJS(endpoint);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/user/${jwt}/${topic}`, (message: IMessage) => {
                    if (message.body) {
                        try {
                            const data = JSON.parse(message.body);
                            onData(data);
                        } catch (e) {
                            console.error(`Failed to parse ${topic} message:`, e);
                        }
                    }
                });
            },
            onStompError: (frame) => {
                console.error(`[${topic}] Broker error:`, frame.headers['message']);
                console.error('Details:', frame.body);
            },
        });
        return client;
    };

    const messages = {
        connect: (jwt: string, onMessage: (data: MessageView) => void) => {
            const client = createClient('http://localhost:8080/ws/websocket', 'notifications', jwt, onMessage);
            client.activate();
            messageClientRef.current = client;
        },
        disconnect: () => {
            messageClientRef.current?.deactivate();
            messageClientRef.current = null;
        },
    };

    const meetNotification = {
        connect: (jwt: string, onNotification: (data: MeetingNotification) => void) => {
            const client = createClient('http://localhost:8080/ws/websocket', 'meeting-invites', jwt, onNotification);
            client.activate();
            meetClientRef.current = client;
        },
        disconnect: () => {
            meetClientRef.current?.deactivate();
            meetClientRef.current = null;
        },
    };

    return {messages, meetNotification};
}
