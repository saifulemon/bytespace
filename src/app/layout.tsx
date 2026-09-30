import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart";
import { ToastProvider } from "@/components/feedback";
import { PreviewProvider } from "@/components/preview-modal";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../../public/fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const clash = localFont({
  variable: "--font-clash",
  src: [{ path: "../../public/fonts/clash-display-700.woff2", weight: "700", style: "normal" }],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ByteSpace — Learn from Hundreds of Courses",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${satoshi.variable} ${clash.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <ToastProvider>
          <CartProvider>
            <PreviewProvider>{children}</PreviewProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
