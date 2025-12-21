'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Domain } from '@/types/chat';
import { FiBook, FiAward, FiActivity, FiZap } from 'react-icons/fi';

interface DomainSelectorProps {
    currentDomain: Domain;
    onDomainChange: (domain: Domain) => void;
}

const domainConfig = {
    Education: {
        icon: FiBook,
        gradient: 'from-cyan-500 to-teal-500',
        color: '#06b6d4',
        description: 'Academic & Learning',
    },
    Legal: {
        icon: FiAward,
        gradient: 'from-amber-500 to-orange-500',
        color: '#f59e0b',
        description: 'Law & Regulations',
    },
    Medical: {
        icon: FiActivity,
        gradient: 'from-emerald-500 to-rose-500',
        color: '#10b981',
        description: 'Health & Wellness',
    },
    Sports: {
        icon: FiZap,
        gradient: 'from-orange-500 to-red-500',
        color: '#ff6b35',
        description: 'Athletics & Fitness',
    },
};

export default function DomainSelector({ currentDomain, onDomainChange }: DomainSelectorProps) {
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

    const handleDomainClick = (domain: Domain) => {
        onDomainChange(domain);
    };

    return (
        <div ref={selectorRef} className="min-w-max">
            <p className="text-xs text-foreground/60 mb-2 font-medium">Select Domain:</p>
            <div className="flex gap-2">
                {(Object.keys(domainConfig) as Domain[]).map((domain) => {
                    const config = domainConfig[domain];
                    const Icon = config.icon;
                    const isActive = currentDomain === domain;

                    return (
                        <button
                            key={domain}
                            onClick={() => handleDomainClick(domain)}
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
                                    {domain}
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
