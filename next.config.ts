import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // The preview player embeds YouTube, whose iframe asks for
          // compute-pressure; without an explicit grant Chromium logs a
          // permissions-policy violation on every embed.
          {
            key: "Permissions-Policy",
            value:
              'compute-pressure=(self "https://www.youtube.com" "https://www.youtube-nocookie.com")',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
