"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getProductById } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductDetailsPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getProductById(params.id);
        if (response.success) {
          setProduct(response.data);
        }
      } catch (error) {
        setError(error.message || '商品の取得に失敗しました。');
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      setError(null);
      const response = await addToCart(product._id, 1);
      if (response.success) {
        router.push('/cart');
      }
    } catch (error) {
      setError(error.message || 'カートへの追加に失敗しました。');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4 space-y-6">
        <div className="border rounded-lg p-6">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white p-4 space-y-6">
        <div className="border rounded-lg p-6">
          <p className="text-center text-muted-foreground">商品が見つかりませんでした。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 space-y-6">
      <div className="border rounded-lg">
        <div className="p-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - Images */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Thumbnail navigation */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 
                      ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Product info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-2xl font-semibold mt-2">
                  {formatPrice(product.price)}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">商品説明</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">カテゴリー</span>
                        <span className="text-muted-foreground">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">職人</span>
                        <span className="text-muted-foreground">{product.master.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">在庫状況</span>
                        <span className={`font-semibold ${product.units > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.units > 0 ? `残り${product.units}点` : '在庫切れ'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={product.units === 0 || isAddingToCart}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart ? '追加中...' : 
                   product.units > 0 ? 'カートに追加' : '在庫切れ'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}