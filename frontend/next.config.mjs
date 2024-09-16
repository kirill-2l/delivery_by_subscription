/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['picsum.photos'],
  },
  // workaround to disable cache in dev mode
  // ...(process.env.NODE_ENV !== 'production' && { cacheMaxMemorySize: 0,  }),
  cacheMaxMemorySize: 0,
};

export default nextConfig;
