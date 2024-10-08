/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'mxvrzrhbgzzmpajfltld.supabase.co',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
