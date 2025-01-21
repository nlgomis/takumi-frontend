import localFont from "next/font/local";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

const shipporiMincho = Shippori_Mincho({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-shippori",
    preload: true,
});

export const metadata = {
    title: "Takumi",
    description: "有田焼のECサイトです。",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="ja"
            className={`${shipporiMincho.variable} h-full overflow-x-hidden `}
        >
            <body className="antialiased font-shippori tracking-wider flex flex-col min-h-screen bg-black">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
