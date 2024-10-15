import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Takumi",
    description: "有田焼のECサイトです。",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja" className="h-full overflow-x-hidden">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <Header />
                    <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
