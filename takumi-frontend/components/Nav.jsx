"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import AuthButton from "./AuthButton"

const Nav = () => {
    const links = [
        { label: 'トップ', path: '/' },
        { label: '匠について', path: '/about/' },
        { label: '商品一覧', path: '/products/' },
        { label: '匠の職人', path: '/craftsman/' },
        { label: 'アクセス', path: '/access/' },
    ]

    const [open, setOpen] = useState(false)
    const navigation = usePathname()

    const handleMenuOpen = () => {
        setOpen(!open)
    }

    const handleMenuClose = () => {
        setOpen(false)
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
                <div className="container h-screen mx-auto px-4 flex justify-center items-center">
                    {/* Logo */}
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

                    {/* Vertical Line */}
                    <div className="w-px h-3/4 bg-white mx-10 md:mx-12"/>

                    {/* Navigation Links */}
                    <ul className="md:w-3/5 md:flex md:flex-row-reverse justify-center items-center gap-16">
                        {links.map((link) => (
                            <li key={link.path} className="md:writing-vertical mb-10 md:mb-0">
                                <Link
                                    href={link.path}
                                    onClick={handleMenuClose}
                                    scroll={false}
                                    className={`
                                        text-xl sm:text-3xl lg:text-4xl
                                        md:writing-mode-vertical-rl
                                        ${link.path === navigation ? 'text-gray-400' : 'text-white'}
                                        hover:text-gray-400 transition-all duration-500
                                    `}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav