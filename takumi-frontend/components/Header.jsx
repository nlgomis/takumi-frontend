"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Nav from "./Nav";

const Header = () => {
    const pathname = usePathname();
    const isTopPage = pathname === "/";
    const [hasScrolled, setHasScrolled] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);

    useEffect(() => {
        // 初期値の設定
        setViewportWidth(window.innerWidth);

        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        if (isTopPage) {
            const handleScroll = () => {
                setHasScrolled(window.scrollY > 0);
            };

            handleScroll();
            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
            };
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isTopPage]);

    const isMobile = viewportWidth <= 768;

    const logoStyles = {
        position: "fixed",
        top: isTopPage ? (hasScrolled ? "40px" : "50vh") : "40px", // ヘッダーの中央に合わせる
        left: isTopPage
            ? isMobile
                ? hasScrolled
                    ? "0%"
                    : "50%" // モバイルではスクロール後に左寄せ
                : "50%"
            : isMobile
                ? "0%"
                : "50%",
        transform: isTopPage
            ? `translate(${hasScrolled && isMobile ? "0" : "-50%"}, -50%) scale(${hasScrolled ? 0.5 : isMobile ? 2.0 : 3.0 // モバイルでは小さめの拡大
            })`
            : `translate(${isMobile ? "0" : "-50%"}, -50%) scale(0.5)`,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 50,
        willChange: isTopPage ? "transform, top, left" : "auto",
    };

    return (
        <header className="bg-black text-white sticky top-0 py-10 z-40 h-20">
            <div className="relative max-w-full mx-auto px-4 h-full flex items-center">
                <div className="w-full relative">
                    <Link href="/" style={logoStyles} className="transform-gpu">
                        <Image
                            src="/images/mainvisual_logo.png"
                            alt="メインロゴ"
                            width={100}
                            height={100}
                            quality={100}
                            priority
                        />
                    </Link>
                    <Nav />
                </div>
            </div>
        </header>
    );
};

export default Header;