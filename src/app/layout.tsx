import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "XRPL Prompt Generator",
  description:
    "막연한 XRPL 아이디어를 제품 구조로 바꾸는 마스터 프롬프트. 폼에 답하면 우측에서 실시간으로 프롬프트가 완성됩니다.",
  metadataBase: new URL("https://prompt-generator.xrplkorea.org"),
  openGraph: {
    title: "XRPL Prompt Generator",
    description: "XRPL 기반 제품 설계를 위한 실무용 마스터 프롬프트 생성기",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
