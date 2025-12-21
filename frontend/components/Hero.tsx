'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        // Floating animation for text
        gsap.to(textRef.current, {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

        // Button entrance animation
        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power3.out',
                }
            );
        }
    }, []);

    return (
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/5 to-transparent opacity-50" />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Main Content */}
            <div className="relative z-10 text-center px-4">
                <div ref={textRef}>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6">
                        <span className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] bg-clip-text text-transparent">
                            AI EXPERT
                        </span>
                        <br />
                        <span className="text-foreground">SYSTEM</span>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl text-foreground/60 max-w-2xl mx-auto mb-12">
                        Domain-Specific Intelligence at Your Fingertips
                    </p>
                </div>

                {/* Start Chat Button */}
                <Link
                    ref={buttonRef}
                    href="/chat"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-semibold text-lg transition-all hover:scale-105 theme-glow group"
                >
                    Start Chatting
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
            </div>

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--theme-primary)] rounded-full blur-[100px] opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--theme-secondary)] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        </section>
    );
}
