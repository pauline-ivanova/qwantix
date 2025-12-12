/**
 * Utility functions for managing cookie consent
 */

declare global {
  interface WindowEventMap {
    openCookieSettings: CustomEvent;
  }
}

/**
 * Opens the cookie consent settings panel
 * This can be called from anywhere in the application
 */
export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('openCookieSettings'))
  }
}
