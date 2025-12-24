'use client';

import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Message, Domain, ChatRequest, ChatResponse, LLMProvider } from '@/types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1/chat';

export const useChat = (initialDomain: Domain = 'Education', initialProvider: LLMProvider = 'groq') => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentDomain, setCurrentDomain] = useState<Domain>(initialDomain);
    const [currentProvider, setCurrentProvider] = useState<LLMProvider>(initialProvider);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingSwitch, setPendingSwitch] = useState<Domain | null>(null);

    // Use refs to store latest values to avoid stale closures
    const domainRef = useRef(currentDomain);
    const providerRef = useRef(currentProvider);

    // Update refs whenever state changes
    domainRef.current = currentDomain;
    providerRef.current = currentProvider;

    // Message sending function using refs for latest values
    const sendMessage = useCallback(async (query: string) => {
        if (!query.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: query,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Use refs to get the most current values
            const payload: ChatRequest = {
                query,
                domain: domainRef.current.toLowerCase(),
                provider: providerRef.current,
                thread_id: 'default_user',
            };

            console.log('Sending payload with provider:', providerRef.current); // Debug log

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

            // Check if response suggests domain switch
            const suggestedDomain = detectDomainSwitch(response.data.response);
            if (suggestedDomain && suggestedDomain !== domainRef.current) {
                setPendingSwitch(suggestedDomain);
            }
        } catch (error: any) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Error: ${error.response?.data?.detail || error.message || 'Failed to get response'}`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty deps since we use refs

    // Domain switch detection
    const detectDomainSwitch = (response: string): Domain | null => {
        const lowerResponse = response.toLowerCase();
        const domains: Domain[] = ['Education', 'Legal', 'Medical', 'Sports'];

        for (const domain of domains) {
            const patterns = [
                `would you like to switch to ${domain.toLowerCase()}`,
                `belongs to the ${domain.toLowerCase()}`,
                `switch to ${domain.toLowerCase()} domain`,
            ];

            if (patterns.some(pattern => lowerResponse.includes(pattern))) {
                return domain;
            }
        }

        return null;
    };

    const confirmDomainSwitch = useCallback(() => {
        if (pendingSwitch) {
            setCurrentDomain(pendingSwitch);
            domainRef.current = pendingSwitch;
            setPendingSwitch(null);
        }
    }, [pendingSwitch]);

    const dismissDomainSwitch = useCallback(() => {
        setPendingSwitch(null);
    }, []);

    const changeDomain = useCallback((domain: Domain) => {
        setCurrentDomain(domain);
        domainRef.current = domain;
        setPendingSwitch(null);
    }, []);

    const changeProvider = useCallback((provider: LLMProvider) => {
        console.log('Changing provider to:', provider); // Debug log
        setCurrentProvider(provider);
        providerRef.current = provider;
    }, []);

    return {
        messages,
        currentDomain,
        currentProvider,
        isLoading,
        pendingSwitch,
        sendMessage,
        confirmDomainSwitch,
        dismissDomainSwitch,
        changeDomain,
        changeProvider,
        setMessages,
    };
};
