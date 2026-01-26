/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.qwantix.agency',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/og/**',
        search: '**',
      },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 1 day - reasonable cache time
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: false, // Optimize CSS output to reduce render-blocking
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
    optimizeServerReact: false,
    // Reduce legacy JavaScript by targeting modern browsers
    esmExternals: true,
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,
  // Optimize production builds
  productionBrowserSourceMaps: true, // Enable source maps for better debugging
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
  // Security Headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://placehold.co https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://challenges.cloudflare.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-src 'self' https://challenges.cloudflare.com",
              "object-src 'none'",
              "media-src 'self'",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // Permissions Policy (formerly Feature-Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'accelerometer=()',
              'ambient-light-sensor=()',
              'autoplay=()',
              'battery=()',
              'camera=()',
              'cross-origin-isolated=()',
              'display-capture=()',
              'document-domain=()',
              'encrypted-media=()',
              'execution-while-not-rendered=()',
              'execution-while-out-of-viewport=()',
              'fullscreen=(self)',
              'geolocation=()',
              'gyroscope=()',
              'keyboard-map=()',
              'magnetometer=()',
              'microphone=()',
              'midi=()',
              'navigation-override=()',
              'payment=()',
              'picture-in-picture=()',
              'publickey-credentials-get=()',
              'screen-wake-lock=()',
              'sync-xhr=()',
              'usb=()',
              'web-share=()',
              'xr-spatial-tracking=()',
            ].join(', '),
          },
          // HTTP Strict Transport Security (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // X-Frame-Options (clickjacking protection)
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // X-Content-Type-Options (MIME type sniffing protection)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // X-DNS-Prefetch-Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
  // Target modern browsers to reduce legacy JavaScript polyfills
  // This reduces bundle size by not including unnecessary polyfills
  webpack: (config, { dev, isServer }) => {
    // Ensure JavaScript is minified in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...(config.optimization.minimizer || []),
        ],
        // Split chunks more aggressively to reduce initial bundle size and improve code splitting
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Separate webpack runtime to reduce main bundle
            webpack: {
              name: 'webpack-runtime',
              test: /[\\/]node_modules[\\/](webpack|@next)[\\/]/,
              priority: 35,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const hash = require('crypto').createHash('sha1');
                hash.update(module.identifier());
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module, chunks) {
                return require('crypto')
                  .createHash('sha1')
                  .update(chunks.reduce((acc, chunk) => acc + chunk.name, ''))
                  .digest('hex')
                  .substring(0, 8);
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  // Simplified webpack config - let Next.js handle optimizations by default
  // Over-complex webpack configs can actually slow down execution
};

module.exports = nextConfig;


