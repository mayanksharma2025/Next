/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  //   images: {
  //     allowFutureImage: true,
  //   },
  // },
  images: {
    // Allow Cloudinary images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/my-media-mayank/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      // If client accepts AVIF, serve .avif file
      {
        source: '/images/:file',
        has: [
          {
            type: 'header',
            key: 'accept',
            // match avif in Accept header
            value: 'image/avif',
          },
        ],
        destination: '/images/:file.avif',
      },
      // If client accepts WebP (and not AVIF), serve .webp
      {
        source: '/images/:file',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: 'image/webp',
          },
        ],
        destination: '/images/:file.webp',
      },
      // default: serve the original file (jpg/png)
      {
        source: '/images/:file',
        destination: '/images/:file',
      },
      {
        source: "/api/users", // verify on url http://localhost:3000/api/users
        destination: "https://jsonplaceholder.typicode.com/users",
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable', // 7 days
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
