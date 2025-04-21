import type { NextConfig } from "next"
import path from 'path'

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error(
    '⚠️ Переменная окружения NEXT_PUBLIC_API_URL не задана. Будет использован локальный сервер по умолчанию.'
  )
}

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'jsx'],
  devIndicators: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./src"),
      "@_app": path.resolve(__dirname, "./src/_app"),
      "@_pages": path.resolve(__dirname, "./src/_pages"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    }
    return config
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    try {
      new URL(apiUrl)
    } catch (error) {
      console.error('Некорректный URL для API:', apiUrl)
      throw new Error('Переменная NEXT_PUBLIC_API_URL должна быть корректным URL.')
    }

    return [
      {
        source: "/auth/",
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig