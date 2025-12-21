'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { Message, Domain, ChatRequest, ChatResponse } from '@/types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1/chat';

export const useChat = (initialDomain: Domain = 'Education') => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentDomain, setCurrentDomain] = useState<Domain>(initialDomain);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingSwitch, setPendingSwitch] = useState<Domain | null>(null);

    // Detect domain switch from response text
    const detectDomainSwitch = (text: string): Domain | null => {
        const switchPatterns = [
            /Would you like to switch to (Education|Legal|Medical|Sports)/i,
            /belongs to the (Education|Legal|Medical|Sports)/i,
            /switch to (Education|Legal|Medical|Sports) expert/i,
        ];

        for (const pattern of switchPatterns) {
            const match = text.match(pattern);
            if (match && match[1]) {
                const detectedDomain = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
                if (['Education', 'Legal', 'Medical', 'Sports'].includes(detectedDomain)) {
                    return detectedDomain as Domain;
                }
            }
        }
        return null;
    };

    const sendMessage = useCallback(
        async (query: string) => {
            if (!query.trim() || isLoading) return;

            const userMessage: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: query,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            try {
                const payload: ChatRequest = {
                    query,
                    domain: currentDomain.toLowerCase(),
                    provider: 'groq',
                    thread_id: 'default_user',
                };

                const response = await axios.post<ChatResponse>(API_URL, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: response.data.response,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);

                // Check for domain switch suggestion
                const suggestedDomain = detectDomainSwitch(response.data.response);
                if (suggestedDomain && suggestedDomain !== currentDomain) {
                    setPendingSwitch(suggestedDomain);
                }
            } catch (error) {
                console.error('Chat API Error:', error);

                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please make sure the backend API is running at http://127.0.0.1:8000',
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        },
        [currentDomain, isLoading]
    );

    const confirmDomainSwitch = useCallback(() => {
        if (pendingSwitch) {
            setCurrentDomain(pendingSwitch);
            setPendingSwitch(null);
        }
    }, [pendingSwitch]);

    const dismissDomainSwitch = useCallback(() => {
        setPendingSwitch(null);
    }, []);

    const changeDomain = useCallback((domain: Domain) => {
        setCurrentDomain(domain);
        setPendingSwitch(null);
    }, []);

    return {
        messages,
        currentDomain,
        isLoading,
        pendingSwitch,
        sendMessage,
        confirmDomainSwitch,
        dismissDomainSwitch,
        changeDomain,
        setMessages,
    };
};
