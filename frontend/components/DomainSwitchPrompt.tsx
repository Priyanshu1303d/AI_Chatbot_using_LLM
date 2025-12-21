'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Domain } from '@/types/chat';
import { FiX, FiCheck } from 'react-icons/fi';

interface DomainSwitchPromptProps {
    domain: Domain;
    onConfirm: () => void;
    onDismiss: () => void;
}

export default function DomainSwitchPrompt({
    domain,
    onConfirm,
    onDismiss,
}: DomainSwitchPromptProps) {
    const promptRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (promptRef.current) {
            gsap.fromTo(
                promptRef.current,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                }
            );
        }
    }, []);

    return (
        <div
            ref={promptRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="glass px-6 py-4 rounded-2xl border border-[var(--theme-primary)]/30 theme-glow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-sm text-foreground/80 mb-1">Domain Switch Available</p>
                        <p className="text-base font-semibold text-foreground">
                            Switch to <span className="text-[var(--theme-primary)]">{domain}</span> Expert?
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onDismiss}
                            className="p-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors"
                            aria-label="Dismiss"
                        >
                            <FiX size={20} />
                        </button>

                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-medium transition-all flex items-center gap-2"
                        >
                            <FiCheck size={20} />
                            Switch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
