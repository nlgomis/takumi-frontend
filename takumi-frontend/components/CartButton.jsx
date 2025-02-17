import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCart } from '@/services/cartService';
import { CART_UPDATED } from '@/lib/events';

const CartButton = ({ onNavigate }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateCartCount = async () => {
    try {
      if (!isAuthenticated) {
        setCartCount(0);
        return;
      }
      const response = await getCart();
      if (response.success && response.data?.products) {
        const totalItems = response.data.products.reduce((sum, item) => sum + item.units, 0);
        setCartCount(totalItems);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
    updateCartCount();
    
    // Listen for cart update events
    const handleCartUpdate = (event) => {
      if (event.detail?.products) {
        const totalItems = event.detail.products.reduce((sum, item) => sum + item.units, 0);
        setCartCount(totalItems);
      } else {
        updateCartCount();
      }
    };
    
    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuth();
      updateCartCount();
    };
    
    window.addEventListener(CART_UPDATED, handleCartUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener(CART_UPDATED, handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated]);

  return (
    <Link
      href="/cart"
      className="flex gap-2 items-center group relative"
      onClick={onNavigate}
    >
      <div className="w-6 h-6 relative mb-1">
        <Image
          src="/images/cart.png"
          alt="cart"
          fill
          className="object-contain brightness-100 group-hover:brightness-75 transition-all duration-300"
        />
        {isAuthenticated && cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </div>
        )}
      </div>
      <span className="text-sm text-white group-hover:text-gray-400 transition-all duration-300 hidden lg:contents">
        カート
      </span>
    </Link>
  );
};

export default CartButton;