/**
 * Security utilities for sanitization and rate limiting
 */

/**
 * Sanitizes a slug to prevent path traversal or other malicious input.
 * Only allows lowercase alphanumeric characters and hyphens.
 */
export function sanitizeSlug(slug: string): string {
  if (typeof slug !== 'string') return '';
  // Convert to lowercase and remove anything that isn't a letter, number, or hyphen
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

/**
 * Sanitizes a generic string input.
 * Useful for form fields before processing or logging.
 */
export function sanitizeString(str: string): string {
  if (typeof str !== 'string') return '';
  // Basic removal of HTML tags and trimming to prevent simple XSS and whitespace issues
  return str.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Simple in-memory rate limiter for development and small-scale production.
 * 
 * IMPORTANT: In a multi-instance (e.g., Vercel multiple workers) or serverless environment, 
 * this will only track limits per instance/function execution. 
 * For a truly global distributed rate limit, a persistent store like Redis is required.
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export interface RateLimitOptions {
  limit: number;      // Maximum number of requests allowed within the window
  windowMs: number;   // Time window in milliseconds
}

/**
 * Checks if a request from a specific identifier (e.g., IP address) exceeds the rate limit.
 * 
 * @param identifier Unique identifier for the client (usually IP address)
 * @param options Rate limit configuration
 * @returns Object indicating success and remaining requests
 */
export function checkRateLimit(identifier: string, options: RateLimitOptions): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier) || { count: 0, lastReset: now };

  // Reset counter if the window has passed
  if (now - entry.lastReset > options.windowMs) {
    entry.count = 1;
    entry.lastReset = now;
  } else {
    entry.count++;
  }

  rateLimitMap.set(identifier, entry);

  return {
    success: entry.count <= options.limit,
    remaining: Math.max(0, options.limit - entry.count),
  };
}

/**
 * Utility to get client IP from request headers in Next.js
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return '127.0.0.1'; // Fallback for local development
}

