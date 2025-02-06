/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO: process.env.MONGO,
  },
}

module.exports = nextConfig
