/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  webpack(config) {
    // Set NODE_ENV to production during build
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
    }

    return config;
  },
};

module.exports = nextConfig
