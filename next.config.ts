import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    experimental: {
        optimisticClientCache: false,
        staleTimes: {
            dynamic: 0,
            static: 0,
        },
    }
};

export default nextConfig;
