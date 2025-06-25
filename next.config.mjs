/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
        domains: ['images.pexels.com'],
        // Local images from public directory are automatically supported
        // No additional configuration needed for local images
        
        // Optional: Configure image formats for better performance
        formats: ['image/webp', 'image/avif'],
        
        // Optional: Configure image sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;