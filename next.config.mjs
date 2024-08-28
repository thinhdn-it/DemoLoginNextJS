/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
      "antd", 
      "@ant-design", 
      "rc-util", 
      "rc-pagination", 
      "rc-picker", 
      "rc-notification", 
      "rc-tooltip", 
      "rc-tree", 
      "rc-table"
    ],
    // Các cấu hình khác có thể thêm vào đây
  };
  
  export default nextConfig;
  