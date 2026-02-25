
// Security Utilities to deter casual copying and cloning

export const initSecurity = () => {
    // Bypass if in development mode, if admin flag is present, or if Dev Mode is saved in storage
    if (
        process.env.NODE_ENV === 'development' || 
        window.location.search.includes('admin=true') ||
        localStorage.getItem('ifa_dev_mode') === 'true'
    ) return; 

    // 1. Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // 2. Disable Keyboard Shortcuts for DevTools
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    });
};

export const checkDomainLock = (): boolean => {
    // 1. Developer Bypass Check (URL or Saved LocalStorage)
    if (
        process.env.NODE_ENV === 'development' || 
        window.location.search.includes('admin=true') || 
        localStorage.getItem('ifa_dev_mode') === 'true'
    ) return true; // Allowed

    // Replace with your actual production domains
    const ALLOWED_DOMAINS = ['localhost', '127.0.0.1', 'ifa-guia.netlify.app', 'seusite.com'];
    
    const currentDomain = window.location.hostname;
    
    // Simple check - allows subdomains
    const isAllowed = ALLOWED_DOMAINS.some(d => currentDomain.includes(d));

    return isAllowed;
};
