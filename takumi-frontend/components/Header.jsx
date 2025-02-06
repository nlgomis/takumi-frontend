"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Nav from "./Nav";

const Header = () => {
    const pathname = usePathname();
    const isTopPage = pathname === "/";
    const [scrollY, setScrollY] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [rafId, setRafId] = useState(null);

    useEffect(() => {
        // 初期値の設定
        setViewportHeight(window.innerHeight);
        setViewportWidth(window.innerWidth);

        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setViewportWidth(window.innerWidth);
        };

        // リサイズイベントの登録（全ページ共通）
        window.addEventListener("resize", handleResize);

        if (isTopPage) {
            const handleScroll = () => {
                if (rafId) return;
                setRafId(requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    setRafId(null);
                }));
            };

            // スクロールイベントの登録（トップページのみ）
            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
                if (rafId) cancelAnimationFrame(rafId);
            };
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [rafId, isTopPage]);

    const headerHeight = 0;
    const logoStartPosition = viewportHeight / 2 - headerHeight;

    const calculateLogoTransform = () => {
        if (!isTopPage) {
            return {
                position: "absolute",
                transform: "translate(-50%, -50%) scale(0.5)",
                top: "50%",
                left: viewportWidth <= 768 ? "10%" : "50%",
                transition: "none"
            };
        }

        const progress = Math.min(1, Math.max(0, scrollY / logoStartPosition));

        if (viewportWidth <= 768) {
            const scale = 3.5 - (progress * 3);
            const easeProgress = progress * (2 - progress);
            const startX = 50;
            const endX = 10;
            const startY = viewportHeight / 2;
            const endY = headerHeight / 2;

            const currentX = startX + (endX - startX) * easeProgress;
            const currentY = startY + (endY - startY) * easeProgress;

            if (progress === 1) {
                return {
                    position: "absolute",
                    transform: "translate(-50%, -50%) scale(0.5)",
                    top: "50%",
                    left: "10%",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                };
            }

            return {
                position: "fixed",
                transform: `translate(-50%, ${currentY}px) scale(${scale})`,
                top: "0",
                left: `${currentX}%`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            };
        }

        if (scrollY >= logoStartPosition) {
            return {
                position: "absolute",
                transform: "translate(-50%, -50%) scale(0.5)",
                top: "50%",
                left: "50%",
            };
        }

        const scale = 3.5 - progress * 3;
        const translateY = (viewportHeight / 2) - (progress * (viewportHeight / 2));

        return {
            position: "fixed",
            transform: `translate(-50%, ${translateY}px) scale(${scale})`,
            top: "0",
            left: "50%",
        };
    };

    const logoStyles = {
        ...calculateLogoTransform(),
        zIndex: 50,
        willChange: isTopPage ? "transform, left, opacity" : "auto",
        transition: isTopPage ? "transform 0.3s ease-out, left 0.3s ease-out" : "none",
    };

    return (
        <header className="bg-black text-white sticky top-0 py-10 z-40 h-20">
            <div className="relative max-w-full mx-auto px-4 h-full flex items-center">
                <div className="w-full relative">
                    <Link href="/"
                        style={logoStyles}
                        className="transform-gpu"
                    >
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