/** @type {import("next").NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['picsum.photos'],
  },
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:3333/:path*`,
      },
    ];
  },
};

export default nextConfig;
