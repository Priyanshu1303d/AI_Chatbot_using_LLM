'use client';

import { useState } from 'react';
import { ChatThread } from '@/types/chat';
import { FiPlus, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { gsap } from 'gsap';

interface ChatHistorySidebarProps {
    threads: ChatThread[];
    currentThreadId: string | null;
    onSelectThread: (threadId: string) => void;
    onDeleteThread: (threadId: string) => void;
    onNewThread: () => void;
}

export default function ChatHistorySidebar({
    threads,
    currentThreadId,
    onSelectThread,
    onDeleteThread,
    onNewThread,
}: ChatHistorySidebarProps) {
    const [hoveredThreadId, setHoveredThreadId] = useState<string | null>(null);

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <aside className="w-64 h-screen glass border-r border-foreground/10 flex flex-col">
            {/* New Chat Button */}
            <div className="p-4 border-b border-foreground/10">
                <button
                    onClick={onNewThread}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-medium transition-all hover:scale-105"
                >
                    <FiPlus size={20} />
                    New Chat
                </button>
            </div>

            {/* Thread List */}
            <div className="flex-1 overflow-y-auto p-2">
                {threads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <FiMessageSquare size={48} className="text-foreground/20 mb-4" />
                        <p className="text-foreground/40 text-sm">
                            No chat history yet
                        </p>
                    </div>
                ) : (
                    threads.map((thread) => (
                        <div
                            key={thread.id}
                            className="relative mb-2 group"
                            onMouseEnter={() => setHoveredThreadId(thread.id)}
                            onMouseLeave={() => setHoveredThreadId(null)}
                        >
                            <button
                                onClick={() => onSelectThread(thread.id)}
                                className={`w-full text-left px-3 py-3 rounded-lg transition-all ${currentThreadId === thread.id
                                        ? 'bg-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/50'
                                        : 'hover:bg-foreground/5'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate mb-1">
                                            {thread.title}
                                        </p>
                                        <p className="text-xs text-foreground/50">
                                            {formatDate(thread.lastMessageAt)}
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    {hoveredThreadId === thread.id && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteThread(thread.id);
                                            }}
                                            className="p-1.5 rounded-md hover:bg-red-500/20 text-foreground/60 hover:text-red-500 transition-colors"
                                            aria-label="Delete thread"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-foreground/10">
                <p className="text-xs text-foreground/40 text-center">
                    AI Expert System
                </p>
            </div>
        </aside>
    );
}
