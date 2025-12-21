import { Domain } from '@/types/chat';

export interface ThemeColors {
    primary: string;
    secondary: string;
    glow: string;
}

const themeConfig: Record<Domain, ThemeColors> = {
    Education: {
        primary: '#06b6d4',
        secondary: '#14b8a6',
        glow: 'rgba(6, 182, 212, 0.3)',
    },
    Legal: {
        primary: '#f59e0b',
        secondary: '#d97706',
        glow: 'rgba(245, 158, 11, 0.3)',
    },
    Medical: {
        primary: '#10b981',
        secondary: '#f43f5e',
        glow: 'rgba(16, 185, 129, 0.3)',
    },
    Sports: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        glow: 'rgba(255, 107, 53, 0.3)',
    },
};

export const useTheme = (domain: Domain): ThemeColors => {
    return themeConfig[domain];
};

export const applyTheme = (domain: Domain) => {
    const theme = themeConfig[domain];
    const root = document.documentElement;

    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-glow', theme.glow);
};
