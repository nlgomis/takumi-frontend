"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/services/productService";

const RecommendHome = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await getAllProducts();
                console.log(getAllProducts);
                if (response.success) {
                    // 最初の6つの商品のみを取得
                    const firstSixProducts = response.data.slice(0, 6).map(product => ({
                        id: product._id,
                        thumbnailImg: product.thumbnailImg,
                        title: product.title,
                        category: product.engTitle,
                        link: `/products/${product._id}`
                    }));
                    setProducts(firstSixProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('商品の取得に失敗しました。');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <section className="bg-black pt-14 min-h-[600px] flex items-center justify-center">
                <div className="text-white">読み込み中...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-black pt-14 min-h-[600px] flex items-center justify-center">
                <div className="text-white">{error}</div>
            </section>
        );
    }

    return (
        <section className="bg-black pt-14">
            <div className="max-w-full mx-auto">
                <div className="ml-5 lg:ml-12 mb-8">
                    <h2 className="text-white text-base lg:text-xl font-light tracking-wide mb-1">
                        Recommend
                    </h2>
                    <h1 className="text-white text-3xl lg:text-4xl font-light mb-2">
                        おすすめ
                    </h1>
                    <div className="relative flex flex-row items-center">
                        <div className="-ml-2 w-[6px] h-[6px] rotate-45 origin-center bg-white" />
                        <div className="w-36 lg:w-52 h-px bg-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            href={product.link}
                            key={product.id}
                            className="group block relative"
                        >
                            <div className="flex flex-col overflow-hidden">
                                <div className="relative aspect-[480/361] overflow-hidden">
                                    <Image
                                        src={product.thumbnailImg}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
                                    />
                                    {/* Hover Details Button */}
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="bg-white/20 border border-white text-white px-20 py-6 text-sm font-medium hover:bg-white/40 transition-colors">
                                            今すぐ詳細を見る
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#3C2A21] p-4 text-center transition-colors duration-500 group-hover:bg-[#4C3A31]">
                                    <h3 className="text-white text-xl mb-1 group-hover:text-white/80 transition-colors duration-500">
                                        {product.title}
                                    </h3>
                                    <p className="text-white/70 text-sm tracking-wider group-hover:text-white/50 transition-colors duration-500">
                                        {product.category}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendHome;