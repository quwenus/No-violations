import { useCallback } from 'react';

export const useSmoothScroll = (offset = 80) => {
    return useCallback((id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    }, [offset]);
};