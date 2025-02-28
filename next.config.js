/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // experimental: {
  //   missingSuspenseWithCSRBailout: false
  // },
  optimizeFonts: false,
  transpilePackages: ['antd'],
  experimental: {
    optimizeCss: true
  },

  images: {
    domains: ['www.wangle.run'], // 确保这里的数组包含你要使用的域名
    unoptimized: true,
  },
   
  trailingSlash: false,
  output: 'export',
  basePath: '',
  assetPrefix: '',
  // basePath: '',
  // assetPrefix: '',
}

module.exports = nextConfig
