import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en "
            className="h-screen w-full"
        >
            <body
                className={`flex items-center justify-center ${inter.className}`}
            >
                {children}
            </body>
        </html>
    );
}
