'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LLMProvider } from '@/types/chat';
import { SiOpenai, SiGooglegemini } from 'react-icons/si';
import { FiCpu, FiZap } from 'react-icons/fi';

interface ProviderSelectorProps {
    currentProvider: LLMProvider;
    onProviderChange: (provider: LLMProvider) => void;
}

const providerConfig = {
    groq: {
        icon: FiZap,
        name: 'Groq',
        gradient: 'from-orange-500 to-red-500',
        color: '#ff6b35',
        description: 'Fast inference with Llama models',
    },
    openai: {
        icon: SiOpenai,
        name: 'OpenAI',
        gradient: 'from-emerald-500 to-teal-500',
        color: '#10b981',
        description: 'GPT-4 and GPT-3.5 models',
    },
    gemini: {
        icon: SiGooglegemini,
        name: 'Gemini',
        gradient: 'from-blue-500 to-indigo-500',
        color: '#3b82f6',
        description: 'Google\'s multimodal AI',
    },
    hf: {
        icon: FiCpu,
        name: 'HuggingFace',
        gradient: 'from-yellow-500 to-orange-500',
        color: '#f59e0b',
        description: 'Open source models',
    },
};

export default function ProviderSelector({ currentProvider, onProviderChange }: ProviderSelectorProps) {
    const selectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectorRef.current) {
            gsap.fromTo(
                selectorRef.current,
                {
                    opacity: 0,
                    y: -20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                }
            );
        }
    }, []);

    const handleProviderClick = (provider: LLMProvider) => {
        onProviderChange(provider);
    };

    return (
        <div ref={selectorRef} className="min-w-max">
            <p className="text-xs text-foreground/60 mb-2 font-medium">Select Provider:</p>
            <div className="flex gap-2">
                {(Object.keys(providerConfig) as LLMProvider[]).map((provider) => {
                    const config = providerConfig[provider];
                    const Icon = config.icon;
                    const isActive = currentProvider === provider;

                    return (
                        <button
                            key={provider}
                            onClick={() => handleProviderClick(provider)}
                            className={`group relative overflow-hidden rounded-xl px-3 py-2 transition-all duration-300 ${isActive
                                    ? 'glass scale-105 ring-2 ring-[var(--theme-primary)] theme-glow-sm'
                                    : 'glass-light hover:scale-105 hover:glass'
                                }`}
                            title={config.description}
                        >
                            {/* Background Gradient on Hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />

                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute top-1 right-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-pulse" />
                                </div>
                            )}

                            {/* Icon + Name */}
                            <div className="relative flex items-center gap-2">
                                <Icon
                                    size={18}
                                    className={isActive ? 'text-[var(--theme-primary)]' : 'text-foreground/70'}
                                />
                                <span className={`text-sm font-medium ${isActive ? 'text-[var(--theme-primary)]' : 'text-foreground'}`}>
                                    {config.name}
                                </span>
                            </div>

                            {/* Animated Border Effect */}
                            {isActive && (
                                <div className="absolute inset-0 rounded-xl border-2 border-[var(--theme-primary)] animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
