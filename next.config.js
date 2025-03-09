/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // `mermaid-isomorphic` をトランスパイル対象にする
    config.module.rules.push({
      test: /\.js$/,
      include: [path.resolve(__dirname, "node_modules/mermaid-isomorphic")],
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"], // Next.js 用の Babel プリセット
        },
      },
    });

    return config;
  },

  // `@/hogehoge` を `app/src/hogehoge` にマッピング
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app/src"),
    },
  },
};

