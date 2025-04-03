import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //did not work
  experimental: {
    turbo: {
      rules: {
        '*.mp3': {
          loaders: ['file-loader'],
        },
      },
    },
  },
  //did not work
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
