"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import AuthButton from "./AuthButton"

const Nav = () => {
    const links = [
        { label: 'トップ', path: '/' },
        { label: '匠について', path: '#about' },
        { label: '商品一覧', path: '/products' },
        { label: '匠の職人', path: '#masters' },
        { label: 'アクセス', path: '#access' },
    ]

    const [open, setOpen] = useState(false)
    const navigation = usePathname()
    const router = useRouter()

    const handleMenuOpen = () => {
        setOpen(!open)
    }

    const handleMenuClose = () => {
        setOpen(false)
    }

    const handleLinkClick = (path) => {
        handleMenuClose()

        // # で始まるリンクの処理
        if (path.startsWith('#')) {
            // トップページにいない場合はトップページに遷移してからスクロール
            if (navigation !== '/') {
                router.push('/')

                // ページ遷移後にスクロール
                setTimeout(() => {
                    const element = document.querySelector(path)
                    if (element) {
                        const offset = 80; // 上部の余白 (必要に応じて調整)
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: elementPosition - offset,
                            behavior: 'smooth'
                        });
                    }
                }, 800) // 遷移後の若干の遅延を考慮
            } else {
                // トップページの場合はそのままスクロール
                const element = document.querySelector(path)
                if (element) {
                    const offset = 80; // 上部の余白 (必要に応じて調整)
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                    });
                }
            }
        } else {
            // 通常のページ遷移
            router.push(path)
        }
    }

    return (
        <div className="relative w-full">
            {/* Language Selector */}
            <AuthButton onNavigate={handleMenuClose} />

            {/* Hamburger Button */}
            <button
                className="z-[60] absolute -top-[18px] right-0 md:right-4 w-10 h-10"
                onClick={handleMenuOpen}
            >
                <span className={`
                    absolute left-0 block w-5 h-0.5 bg-white transition-all duration-300
                    ${open
                        ? "top-1/2 rotate-45"
                        : "top-1/3"
                    }
                `} />
                <span className={`
                    absolute top-1/2 left-0 block w-5 h-0.5 bg-white transition-all duration-300
                    ${open
                        ? "opacity-0"
                        : "-translate-y-1/2"
                    }
                `} />
                <span className={`
                    absolute left-0 block w-5 h-0.5 bg-white transition-all duration-300
                    ${open
                        ? "top-1/2 -rotate-45"
                        : "bottom-1/3"
                    }
                `} />
            </button>

            {/* Navigation Menu */}
            <nav className={`
                fixed inset-0 bg-black transition-all duration-500 z-50
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}
            `}>

                <div className="container h-screen mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full h-40 md:hidden"></div>
                    {/* Logo */}
                    <div className="w-24 mb-6 md:mb-0 md:w-1/5 order-3 md:order-1">
                        <Image
                            src="/images/mainvisual_logo.png"
                            alt="ロゴ"
                            width={250}
                            height={250}
                            quality={100}
                            priority
                        />
                    </div>

                    {/* Vertical Line */}
                    <div className="w-px h-3/4 bg-white mx-10 md:mx-12 hidden md:block order-2" />

                    {/* Navigation Links */}
                    <ul className="md:w-3/5 md:flex md:flex-row-reverse justify-center items-center gap-16 order-1 md:order-3">
                        {links.map((link) => (
                            <li key={link.path} className="md:writing-vertical mb-10 md:mb-0 text-center md:text-start">
                                <button
                                    onClick={() => handleLinkClick(link.path)}
                                    className={`
                                        text-xl sm:text-3xl 2xl:text-4xl
                                        md:writing-mode-vertical-rl
                                        ${link.path === navigation ? 'text-gray-400' : 'text-white'}
                                        hover:text-gray-400 transition-all duration-500
                                    `}
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav