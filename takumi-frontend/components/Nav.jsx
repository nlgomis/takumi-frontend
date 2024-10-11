"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const Nav = () => {
    const links = [
        { label: 'トップ', path: '/' },
        { label: '匠について', path: '/about/' },
        { label: '商品一覧', path: '/products/' },
        { label: '匠の職人', path: '/craftsman/' },
        { label: 'アクセス', path: '/access/' },
    ];
    const [open, setOpen] = useState(false);

    const handleMenuOpen = () => {
        setOpen(!open);
    }

    const handleMenuClose = () => {
        setOpen(false);
    }

    const navigation = usePathname();


    return (
        <div className="flex justify-end">
            <nav className={
                // trueの時とfalseの時でcssを分ける
                open
                    ? "z-[50] bg-black top-0 right-0 bottom-0 left-0 h-screen fixed flex flex-col"
                    : " right-[-100%] fixed"
            }>
                <ul className={
                    open
                        ? "flex h-screen flex-row-reverse justify-center items-center gap-10 text-xl"
                        : "block"
                }
                >
                    {links.map((link, index) => (
                        <li key={index} className='text-white hover:text-gray-400 duration-500 text-2xl xs:text-3xl lg:text-4xl xl:text-5xl vertical-rl'>
                            <Link
                                className={`${link.path === navigation && 'text-gray-400'} relative flex items-center group hover:text-gray-400 transition-all duration-500`}
                                onClick={handleMenuClose}
                                href={link.path}
                                // ページ遷移をした際,ページトップに行かないようにfalse
                                scroll={false}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <button
                className="z-[50] relative w-10 h-10 mx-3 sm:mx-5 lg:mr-12"
                onClick={handleMenuOpen}
            >
                <span className={
                    open
                        ? "absolute top-1/2 left-0 block w-9 h-0.5 xs:w-8 xs:h-0.5 bg-white rotate-45 transition-all duration-300"
                        : "absolute top-1/4 left-0 block w-9 h-0.5 xs:w-8 xs:h-0.5 bg-white transition-all duration-300"
                }
                />
                <span className={
                    open
                        ? "absolute top-1/2 left-0 block w-9 h-0.5 xs:w-8 xs:h-0.5 bg-white opacity-0 transition-all duration-300"
                        : "absolute top-1/2 left-0 block w-9 h-0.5 xs:w-8 xs:h-0.5 bg-white -translate-y-1/2 transition-all duration-300"
                }
                />
                <span className={
                    open
                        ? "absolute top-1/2 left-0 block w-9 h-0.5 xs:w-8 xs:h-0.5 bg-white -rotate-45 transition-all duration-300"
                        : "absolute bottom-1/4 left-0 block w-9 h-0.5 xs:w-8 xs:h-0.5 bg-white transition-all duration-300"
                }
                />
            </button>
        </div>
    )
}

export default Nav