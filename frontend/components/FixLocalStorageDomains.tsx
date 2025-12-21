'use client';

import { useEffect } from 'react';

export default function FixLocalStorageDomains() {
    useEffect(() => {
        // Run once on mount to fix existing localStorage threads
        const fixDomains = () => {
            const savedThreads = localStorage.getItem('chatThreads');
            if (!savedThreads) return;

            const threads = JSON.parse(savedThreads);
            let updated = false;

            const fixedThreads = threads.map((thread: any) => {
                // If thread has messages but domain is Education, try to detect actual domain
                if (thread.messages && thread.messages.length > 0 && thread.domain === 'Education') {
                    // Check the first message content for domain keywords
                    const firstMessage = thread.messages[0]?.content?.toLowerCase() || '';

                    let detectedDomain = 'Education';
                    if (firstMessage.includes('basketball') || firstMessage.includes('sport') || firstMessage.includes('football') || firstMessage.includes('cricket')) {
                        detectedDomain = 'Sports';
                    } else if (firstMessage.includes('diabetes') || firstMessage.includes('medical') || firstMessage.includes('health') || firstMessage.includes('doctor')) {
                        detectedDomain = 'Medical';
                    } else if (firstMessage.includes('legal') || firstMessage.includes('law') || firstMessage.includes('court')) {
                        detectedDomain = 'Legal';
                    }

                    if (detectedDomain !== thread.domain) {
                        console.log(`Fixed thread "${thread.title}" from ${thread.domain} to ${detectedDomain}`);
                        updated = true;
                        return { ...thread, domain: detectedDomain };
                    }
                }
                return thread;
            });

            if (updated) {
                localStorage.setItem('chatThreads', JSON.stringify(fixedThreads));
                console.log('✅ Fixed domain assignments in localStorage');
                // Reload the page to reflect changes
                window.location.reload();
            }
        };

        fixDomains();
    }, []);

    return null;
}
