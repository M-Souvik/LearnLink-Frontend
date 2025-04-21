/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost',
      'learnlink-backend-1l4p.onrender.com'
    ],
  },
  env:{
    NEXT_API_URL: process.env.NEXT_API_URL
  }
};

export default nextConfig;
