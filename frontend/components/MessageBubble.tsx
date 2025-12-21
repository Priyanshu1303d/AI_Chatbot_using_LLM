'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bubbleRef.current) {
            gsap.fromTo(
                bubbleRef.current,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                }
            );
        }
    }, []);

    const isUser = message.role === 'user';

    return (
        <div
            ref={bubbleRef}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-[var(--theme-primary)] text-white'
                        : 'glass text-foreground'
                    }`}
            >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                </p>

                <span className="text-xs opacity-60 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </div>
        </div>
    );
}
