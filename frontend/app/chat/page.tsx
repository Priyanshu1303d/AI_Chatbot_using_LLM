'use client';

import { useState, useEffect } from 'react';
import { applyTheme } from '@/hooks/useTheme';
import ChatHistorySidebar from '@/components/ChatHistorySidebar';
import ChatInterface from '@/components/ChatInterface';
import FixLocalStorageDomains from '@/components/FixLocalStorageDomains';
import { ChatThread, Domain } from '@/types/chat';

export default function ChatPage() {
    const [threads, setThreads] = useState<ChatThread[]>([]);
    const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
    const [currentDomain, setCurrentDomain] = useState<Domain>('Education');

    // Load threads from localStorage on mount
    useEffect(() => {
        const savedThreads = localStorage.getItem('chatThreads');
        if (savedThreads) {
            try {
                const parsedThreads = JSON.parse(savedThreads);
                // Convert date strings back to Date objects
                const threadsWithDates = parsedThreads.map((thread: any) => ({
                    ...thread,
                    createdAt: new Date(thread.createdAt),
                    lastMessageAt: new Date(thread.lastMessageAt),
                    messages: thread.messages.map((msg: any) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp),
                    })),
                }));
                setThreads(threadsWithDates);

                // Set the first thread as current if available
                if (threadsWithDates.length > 0) {
                    setCurrentThreadId(threadsWithDates[0].id);
                    setCurrentDomain(threadsWithDates[0].domain);
                }
            } catch (error) {
                console.error('Error loading threads:', error);
                localStorage.removeItem('chatThreads');
            }
        }
        // Don't create any threads automatically - user must click "New Chat"
    }, []);

    // Save threads to localStorage whenever they change
    useEffect(() => {
        if (threads.length > 0) {
            localStorage.setItem('chatThreads', JSON.stringify(threads));
        } else {
            localStorage.removeItem('chatThreads');
        }
    }, [threads]);

    // Apply theme when domain changes
    useEffect(() => {
        applyTheme(currentDomain);
    }, [currentDomain]);

    const createNewThread = () => {
        const newThread: ChatThread = {
            id: crypto.randomUUID(),
            title: 'New Conversation',
            createdAt: new Date(),
            lastMessageAt: new Date(),
            messages: [],
            domain: currentDomain,
        };
        setThreads((prev) => [newThread, ...prev]);
        setCurrentThreadId(newThread.id);
    };

    const deleteThread = (threadId: string) => {
        setThreads((prev) => {
            const filtered = prev.filter((t) => t.id !== threadId);

            // Update localStorage with filtered threads
            if (filtered.length > 0) {
                localStorage.setItem('chatThreads', JSON.stringify(filtered));
            } else {
                localStorage.removeItem('chatThreads');
            }

            // If we deleted the current thread, select another or clear selection
            if (threadId === currentThreadId) {
                if (filtered.length > 0) {
                    setCurrentThreadId(filtered[0].id);
                    setCurrentDomain(filtered[0].domain);
                } else {
                    setCurrentThreadId(null);
                }
            }

            return filtered;
        });
    };

    const handleDomainChange = (newDomain: Domain) => {
        // Only create new thread if domain actually changed
        if (newDomain !== currentDomain) {
            setCurrentDomain(newDomain);
            // Create a new thread for the new domain
            const newThread: ChatThread = {
                id: crypto.randomUUID(),
                title: 'New Conversation',
                createdAt: new Date(),
                lastMessageAt: new Date(),
                messages: [],
                domain: newDomain,
            };
            setThreads((prev) => [newThread, ...prev]);
            setCurrentThreadId(newThread.id);
        }
    };

    const selectThread = (threadId: string) => {
        const thread = threads.find((t) => t.id === threadId);
        if (thread) {
            setCurrentThreadId(threadId);
            setCurrentDomain(thread.domain);
        }
    };

    const updateThread = (threadId: string, updates: Partial<ChatThread>) => {
        setThreads((prev) =>
            prev.map((thread) =>
                thread.id === threadId ? { ...thread, ...updates } : thread
            )
        );
    };

    const currentThread = threads.find((t) => t.id === currentThreadId);

    return (
        <>
            <FixLocalStorageDomains />
            <div className="flex h-screen w-full bg-background">
                {/* Chat History Sidebar */}
                <ChatHistorySidebar
                    threads={threads}
                    currentThreadId={currentThreadId}
                    onSelectThread={selectThread}
                    onDeleteThread={deleteThread}
                    onNewThread={createNewThread}
                />

                {/* Main Chat Interface */}
                <div className="flex-1 overflow-hidden">
                    {currentThread ? (
                        <ChatInterface
                            key={currentThreadId}
                            threadId={currentThread.id}
                            initialMessages={currentThread.messages}
                            initialDomain={currentThread.domain}
                            onMessagesUpdate={(messages) =>
                                updateThread(currentThread.id, {
                                    messages,
                                    lastMessageAt: new Date(),
                                    title:
                                        messages.length > 0 && messages[0].role === 'user'
                                            ? messages[0].content.slice(0, 50) + '...'
                                            : currentThread.title,
                                })
                            }
                            onDomainChange={handleDomainChange}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center px-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--theme-primary)]/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-[var(--theme-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-foreground mb-4">
                                    Welcome to AI Expert System
                                </h2>
                                <p className="text-foreground/60 text-lg mb-2">
                                    Click the <span className="text-[var(--theme-primary)] font-semibold">"New Chat"</span> button to start a conversation
                                </p>
                                <p className="text-foreground/40 text-sm">
                                    Choose your domain and AI provider to get started
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
