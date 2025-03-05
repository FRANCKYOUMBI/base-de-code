/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_API_URL: process.env.BASE_API_URL, 
  },
  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/redqteam.com/isomorphic-furyroad/public/**",
      },
      {
        protocol: "https",
        hostname: "isomorphic-furyroad.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "isomorphic-furyroad.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9001"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "80"
      },
      {
        protocol: "http",
        hostname: "192.168.1.58",
        port: "5001"
      },
      {
        protocol: "http",
        hostname: "192.168.1.241",
        port: "5001"
      },
      {
        protocol: "http",
        hostname: "192.168.1.220",
        port: "5001"
      },
      {
        protocol: "https",
        hostname: "files.koalizz.fr"
      },
      {
        protocol: "http",
        hostname: "45.130.104.46",
        port: "5080"
      }
    ],
  },
  reactStrictMode: false,
  transpilePackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    }
  }
};

export default nextConfig;
