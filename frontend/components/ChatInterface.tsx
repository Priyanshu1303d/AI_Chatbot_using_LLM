'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { applyTheme } from '@/hooks/useTheme';
import MessageBubble from './MessageBubble';
import DomainSwitchPrompt from './DomainSwitchPrompt';
import DomainSelector from './DomainSelector';
import ProviderSelector from './ProviderSelector';
import { FiSend } from 'react-icons/fi';
import { gsap } from 'gsap';
import { Message, Domain, LLMProvider } from '@/types/chat';

interface ChatInterfaceProps {
    threadId?: string;
    initialMessages?: Message[];
    initialDomain?: Domain;
    initialProvider?: LLMProvider;
    onMessagesUpdate?: (messages: Message[]) => void;
    onDomainChange?: (domain: Domain) => void;
    onProviderChange?: (provider: LLMProvider) => void;
}

export default function ChatInterface({
    threadId,
    initialMessages = [],
    initialDomain = 'Education',
    initialProvider = 'groq',
    onMessagesUpdate,
    onDomainChange,
    onProviderChange,
}: ChatInterfaceProps) {
    const {
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
        setMessages: setInternalMessages,
    } = useChat(initialDomain, initialProvider);

    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Sync domain when thread changes - always update to match the thread's domain
    useEffect(() => {
        changeDomain(initialDomain);
    }, [threadId]);

    // Sync provider when thread changes
    useEffect(() => {
        if (initialProvider) {
            changeProvider(initialProvider);
        }
    }, [threadId]);

    // Initialize messages when thread changes
    useEffect(() => {
        if (initialMessages.length > 0) {
            setInternalMessages(initialMessages);
        } else {
            setInternalMessages([]);
        }
    }, [threadId]);

    // Notify parent of messages update
    useEffect(() => {
        if (onMessagesUpdate && messages.length > 0) {
            onMessagesUpdate(messages);
        }
    }, [messages]);

    // Apply theme when domain changes
    useEffect(() => {
        applyTheme(currentDomain);
    }, [currentDomain]);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Entrance animation
    useEffect(() => {
        if (chatContainerRef.current) {
            gsap.fromTo(
                chatContainerRef.current,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                }
            );
        }
    }, [threadId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleDomainChange = (domain: Domain) => {
        changeDomain(domain);
        if (onDomainChange) {
            onDomainChange(domain);
        }
    };

    const handleProviderChange = (provider: LLMProvider) => {
        changeProvider(provider);
        if (onProviderChange) {
            onProviderChange(provider);
        }
    };

    return (
        <section className="h-screen w-full flex items-center justify-center py-8 px-4 bg-background overflow-hidden">
            <div
                ref={chatContainerRef}
                className="w-full max-w-7xl h-full glass rounded-3xl p-6 md:p-8 theme-glow flex flex-col"
            >
                {/* Header with Selectors on Right */}
                <div className="mb-6 pb-4 border-b border-foreground/10 flex items-start justify-between gap-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Chat with AI Expert
                        </h2>
                        <p className="text-sm text-foreground/60">
                            Domain:{' '}
                            <span className="text-[var(--theme-primary)] font-semibold">
                                {currentDomain}
                            </span>
                            {' • '}
                            Provider:{' '}
                            <span className="text-[var(--theme-primary)] font-semibold">
                                {currentProvider}
                            </span>
                        </p>
                    </div>

                    {/* Selectors on Right Side */}
                    <div className="flex-shrink-0 flex flex-col gap-4">
                        <DomainSelector currentDomain={currentDomain} onDomainChange={handleDomainChange} />
                        <ProviderSelector currentProvider={currentProvider} onProviderChange={handleProviderChange} />
                    </div>
                </div>

                {/* Messages Container with Transparent Scrollbar */}
                <div className="flex-1 overflow-y-auto mb-6 pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--theme-primary)]/20 flex items-center justify-center">
                                    <FiSend size={32} className="text-[var(--theme-primary)]" />
                                </div>
                                <p className="text-foreground/40 text-lg">
                                    Start a conversation with the AI expert
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}

                    {isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="glass rounded-2xl px-4 py-3">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-bounce" />
                                    <div className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className="flex-1 glass-light rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] transition-all disabled:opacity-50"
                    />

                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-3 rounded-xl bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 theme-glow-sm"
                    >
                        <FiSend size={20} />
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </form>
            </div>

            {/* Domain Switch Prompt */}
            {pendingSwitch && (
                <DomainSwitchPrompt
                    domain={pendingSwitch}
                    onConfirm={confirmDomainSwitch}
                    onDismiss={dismissDomainSwitch}
                />
            )}
        </section>
    );
}
