import type { NextConfig } from "next";

// GitHub Pages 전용 설정은 GITHUB_PAGES=true 환경변수 분기로만 활성화된다.
// Vercel 등 다른 배포 환경엔 이 변수를 박지 말 것 (자동으로 정상 SSR/루트 경로 모드).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "xrpl-prompt-generator";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGithubPages,
  },
};

export default nextConfig;
