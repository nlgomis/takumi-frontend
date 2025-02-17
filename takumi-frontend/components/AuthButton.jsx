import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CartButton from './CartButton'

const AuthButton = ({ onNavigate }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const authNavItems = isAuthenticated ? [
        { 
            label: 'プロフィール', 
            code: 'profile',
            url: '/images/mypage.png',
            alt: 'profile',
            path: '/profile'
        }
    ] : [
        {
            label: 'ログイン',
            code: 'login',
            url: '/images/mypage.png',
            alt: 'login',
            path: '/auth/login'
        }
    ];

    if (isLoading) {
        return null;
    }

    return (
        <div className="absolute flex items-center justify-end right-16 md:right-20 -top-3 gap-5 z-[60]">
            {authNavItems.map((item) => (
                <Link
                    href={item.path}
                    key={item.code}
                    className="flex gap-2 items-center group"
                    onClick={onNavigate}
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
            <CartButton onNavigate={onNavigate} />
        </div>
    )
}

export default AuthButton