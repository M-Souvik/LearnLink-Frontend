/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost',
      'learnlink-backend-1l4p.onrender.com'
    ],
  },
  env:{
    API_URL: process.env.API_URL
  }
};

export default nextConfig;
