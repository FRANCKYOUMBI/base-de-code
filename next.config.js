/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
