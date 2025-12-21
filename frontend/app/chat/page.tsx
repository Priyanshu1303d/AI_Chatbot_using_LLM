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
        } else {
            // Create initial thread
            createNewThread();
        }
    }, []);

    // Save threads to localStorage whenever they change
    useEffect(() => {
        if (threads.length > 0) {
            localStorage.setItem('chatThreads', JSON.stringify(threads));
        }
    }, [threads]);

    // Apply theme when domain changes
    useEffect(() => {
        applyTheme(currentDomain);
    }, [currentDomain]);

    const createNewThread = () => {
        const newThread: ChatThread = {
            id: Date.now().toString(),
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
            // If we deleted the current thread, select the first one or create new
            if (threadId === currentThreadId) {
                if (filtered.length > 0) {
                    setCurrentThreadId(filtered[0].id);
                } else {
                    setCurrentThreadId(null);
                    setTimeout(createNewThread, 0);
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
                id: Date.now().toString(),
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
                            <p className="text-foreground/40">Loading...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
