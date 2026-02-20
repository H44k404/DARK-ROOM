import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000'; // Auto-detect in prod

const useNewsSocket = (onNewArticle) => {
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(SOCKET_URL, {
            transports: ['polling', 'websocket'], // Allow fallback to polling
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        // Listen for connection
        socketRef.current.on('connect', () => {
            console.log('Connected to news socket');
        });

        // Listen for new article events
        socketRef.current.on('new-article', (article) => {
            console.log('New article received:', article);
            if (onNewArticle) {
                onNewArticle(article);
            }
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [onNewArticle]);

    return socketRef.current;
};

export default useNewsSocket;
