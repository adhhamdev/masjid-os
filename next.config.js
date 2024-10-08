/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'mxvrzrhbgzzmpajfltld.supabase.co',
        protocol: 'https',
        pathname: '/storage/v1/object/public/masjid-images/**',
      },
    ],
  },
};

module.exports = nextConfig;
