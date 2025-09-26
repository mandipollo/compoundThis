import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "res.cloudinary.com",
				protocol: "https",
			},
			{ hostname: "api.polygon.io", protocol: "https" },
			{ hostname: "img.logo.dev", protocol: "https" },
			{ hostname: "s3.polygon.io", protocol: "https" },
		],
	},
};

export default nextConfig;
