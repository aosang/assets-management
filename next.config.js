/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // experimental: {
  //   missingSuspenseWithCSRBailout: false
  // },

  images: {
    domains: ['www.wangle.run'], // 确保这里的数组包含你要使用的域名
    unoptimized: true,
  },
   
  trailingSlash: true,
  output: 'export',
  basePath: '/assetsManager',
  assetPrefix: '/assetsManager',
}

module.exports = nextConfig
