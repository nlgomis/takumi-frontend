"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import AuthButton from "./AuthButton"

const Nav = () => {
    const links = [
        { label: 'トップ', path: '/', isAnchor: false },
        { label: '匠について', path: 'about', isAnchor: true },
        { label: '商品一覧', path: '/products', isAnchor: false },
        { label: '匠の職人', path: 'masters', isAnchor: true },
        { label: 'アクセス', path: 'access', isAnchor: true },
    ]

    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const handleMenuOpen = () => {
        setOpen(!open)
    }

    const handleMenuClose = () => {
        setOpen(false)
    }

    const renderLink = (link) => {
        if (link.isAnchor) {
            // 現在のパスがルートページでない場合は、ルートページに遷移してからアンカーまでスクロール
            const href = pathname === '/' ? `#${link.path}` : `/?section=${link.path}`
            
            return (
                <Link
                    href={href}
                    onClick={handleMenuClose}
                    className={`
                        text-xl sm:text-3xl lg:text-4xl
                        md:writing-mode-vertical-rl
                        ${pathname === '/' && pathname.includes(link.path) ? 'text-gray-400' : 'text-white'}
                        hover:text-gray-400 transition-all duration-500
                    `}
                >
                    {link.label}
                </Link>
            )
        }

        return (
            <Link
                href={link.path}
                onClick={handleMenuClose}
                scroll={false}
                className={`
                    text-xl sm:text-3xl lg:text-4xl
                    md:writing-mode-vertical-rl
                    ${link.path === pathname ? 'text-gray-400' : 'text-white'}
                    hover:text-gray-400 transition-all duration-500
                `}
            >
                {link.label}
            </Link>
        )
    }

    return (
        <div className="relative w-full">
            <AuthButton onNavigate={handleMenuClose} />
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

            <nav className={`
                fixed inset-0 bg-black transition-all duration-500 z-50
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}
            `}>
                <div className="container h-screen mx-auto px-4 flex justify-center items-center">
                    <div className="w-32 md:w-1/5">
                        <Image
                            src="/images/mainvisual_logo.png"
                            alt="ロゴ"
                            width={250}
                            height={250}
                            quality={100}
                            priority
                        />
                    </div>

                    <div className="w-px h-3/4 bg-white mx-10 md:mx-12" />

                    <ul className="md:w-3/5 md:flex md:flex-row-reverse justify-center items-center gap-16">
                        {links.map((link) => (
                            <li key={link.path} className="md:writing-vertical mb-10 md:mb-0">
                                {renderLink(link)}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav