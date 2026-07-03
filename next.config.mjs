/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Retired in the personal revamp; the home page now serves this audience.
        source: "/for-clients",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
