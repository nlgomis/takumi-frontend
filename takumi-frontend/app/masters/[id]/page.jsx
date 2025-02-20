"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getMasterWithProducts } from "@/services/shokuninService";
import { addToCart } from "@/services/cartService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { dispatchCartUpdate } from "@/lib/events";

export default function MasterDetailsPage({ params }) {
  const router = useRouter();
  const [master, setMaster] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartLoadingProductId, setCartLoadingProductId] = useState(null);

  // 認証状態チェック
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    async function fetchMasterData() {
      try {
        const response = await getMasterWithProducts(params.id);
        setMaster(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    fetchMasterData();
  }, [params.id]);

  // カートに追加ハンドラー
  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    try {
      setCartLoadingProductId(product._id);
      const response = await addToCart(product._id, 1);
      if (response.success) {
        dispatchCartUpdate(response.data);
        router.push("/products");
      }
    } catch (error) {
      console.error("カートへの追加に失敗:", error);
      // エラーハンドリングを追加（必要に応じて）
    } finally {
      setCartLoadingProductId(null);
    }
  };

  // 商品詳細ページへのナビゲーション
  const navigateToProductDetails = (productId) => {
    router.push(`/products/${productId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* マスター紹介セクション */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 pt-12 pb-28">
          <div className="mb-12">
            <h2 className="text-white text-base lg:text-xl font-light tracking-wide mb-1">
              Master
            </h2>
            <h1 className="text-white text-3xl lg:text-4xl font-light mb-2">
              職人紹介
            </h1>
            <div className="relative flex flex-row items-center">
              <div className="-ml-2 w-[6px] h-[6px] rotate-45 origin-center bg-white" />
              <div className="w-36 lg:w-52 h-px bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:items-start">
            <div className="rounded-lg">
              <img
                src={master.image}
                alt={master.name}
                className="w-full h-auto rounded-none"
              />
            </div>
            <div className="flex flex-col space-y-8 text-white md:mt-24">
              <div className="relative">
                <Image
                  src="/images/image1.png"
                  alt="Decorative element"
                  width={120}
                  height={120}
                  className="absolute -top-7 -left-8 rounded-none"
                />
                <div className="pl-6">
                  <h3 className="text-5xl font-medium mb-4 tracking-widest">
                    {master.name}
                  </h3>
                  <p className="text-xl text-gray-300 pl-8 tracking-wider">
                    {master.romajiName}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-base text-[#B1947F]">{master.address}</p>
                <p className="text-base text-[#B1947F]">{master.style}</p>
              </div>
              <p className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">
                {master.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 職人作品セクション */}
      {master.products && master.products.length > 0 && (
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-12">
            <div className="mb-12">
              <h2 className="text-black text-base lg:text-xl font-light tracking-wide mb-1">
                Masterpiece
              </h2>
              <h1 className="text-black text-3xl lg:text-4xl font-light mb-2">
                職人作品
              </h1>
              <div className="relative flex flex-row items-center">
                <div className="-ml-2 w-[6px] h-[6px] rotate-45 origin-center bg-black" />
                <div className="w-36 lg:w-52 h-px bg-black" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-16">
              {master.products.map((product) => (
                <div
                  key={product._id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-start"
                >
                  <div className="aspect-[4/3] bg-white rounded-lg flex items-center justify-center p-4">
                    <img
                      src={product.thumbnailImg || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-6 md:mt-24">
                    <h3 className="text-4xl font-medium">{product.title}</h3>
                    <p className="text-2xl text-gray-600">
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(product.price)}
                    </p>
                    <p className="text-gray-700 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="space-y-4">
                      <Button
                        onClick={() => navigateToProductDetails(product._id)}
                        className="w-full py-7 bg-[#505050] text-white hover:bg-[#404040] text-lg rounded-none font-semibold"
                      >
                        商品詳細
                      </Button>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={
                          product.units === 0 ||
                          cartLoadingProductId === product._id
                        }
                        className="w-full py-10 bg-[#B1947F] hover:bg-[#a1846f] text-white text-lg rounded-none font-semibold"
                      >
                        {cartLoadingProductId === product._id
                          ? "追加中..."
                          : !isAuthenticated
                          ? "ログインしてカートに追加"
                          : product.units > 0
                          ? "カートに入れる"
                          : "在庫切れ"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
