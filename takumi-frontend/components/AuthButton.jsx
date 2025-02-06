import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navBar = [
    { 
        label: 'マイページ', 
        code: 'login',
        url: '/images/mypage.png',
        alt: 'mypage',
        path: '/mypage'
    },
    { 
        label: 'カート', 
        url: '/images/cart.png',
        alt: 'cart',
        code: 'cart',
        path: '/cart'
    },
]

const AuthButton = () => {
    return (
        <div className="absolute flex items-center justify-end right-16 md:right-20 -top-3 gap-5 z-[60]">
            {navBar.map((item) => (
                <Link
                    href={item.path || '#'}
                    key={item.code}
                    className="flex gap-2 items-center group"
                >
                    <div className="w-6 h-6 relative mb-1">
                        <Image
                            src={item.url}
                            alt={item.alt}
                            fill
                            className="object-contain brightness-100 group-hover:brightness-75 transition-all duration-300"
                        />
                    </div>
                    <span className="text-sm text-white group-hover:text-gray-400 transition-all duration-300 hidden lg:contents">
                        {item.label}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default AuthButton