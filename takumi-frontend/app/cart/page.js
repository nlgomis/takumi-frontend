"use client";

import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart } from '@/services/cartService';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      setError(error.message || "カートの取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, currentUnits, increment) => {
    const newUnits = currentUnits + increment;
    if (newUnits < 1) return;

    try {
      setError(null);
      const response = await updateCartItem(productId, newUnits);
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      setError(error.message || "カートの更新に失敗しました。");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setError(null);
      const response = await removeFromCart(productId);
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      setError(error.message || "商品の削除に失敗しました。");
    }
  };

  const calculateTotal = () => {
    if (!cart?.products?.length) return 0;
    return cart.products.reduce((total, item) => {
      return total + (item.product.price * item.units);
    }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!cart?.products?.length) {
    return (
      <div className="container mx-auto p-4">
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">カートは空です。</p>
              <Button onClick={() => router.push('/')}>
                買い物を続ける
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ショッピングカート</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.products.map((item) => (
            <Card key={item.product._id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img
                      src={item.product.thumbnailImg}
                      alt={item.product.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-muted-foreground">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdateQuantity(item.product._id, item.units, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.units}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdateQuantity(item.product._id, item.units, 1)}
                      disabled={item.units >= item.product.units}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold">
                      {formatPrice(item.product.price * item.units)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item.product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">注文内容</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>小計</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>配送料</span>
                  <span>無料</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>合計</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>

                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => router.push('/checkout')}
                >
                  レジに進む
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}