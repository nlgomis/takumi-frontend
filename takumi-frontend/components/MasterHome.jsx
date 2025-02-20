"use client";
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { getAllMasters } from '@/services/shokuninService'

const MasterHome = () => {
    const [masters, setMasters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchMasters = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await getAllMasters();

                if (response.success) {
                    // データの形式を統一
                    const formattedMasters = response.data.map(master => ({
                        id: master._id,
                        name: master.name,
                        romajiName: master.romajiName,
                        link: `/masters/${master._id}`
                    }));
                    setMasters(formattedMasters);
                } else {
                    setError(response.message || 'データの取得に失敗しました。');
                }
            } catch (error) {
                console.error('Error fetching masters:', error);
                setError('職人データの取得に失敗しました。');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMasters();
    }, []);

    if (isLoading) {
        return (
            <section className="bg-black min-h-[400px] flex items-center justify-center">
                <div className="text-white">読み込み中...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-black min-h-[400px] flex items-center justify-center">
                <div className="text-white">{error}</div>
            </section>
        );
    }

    if (masters.length === 0) {
        return (
            <section className="bg-black min-h-[400px] flex items-center justify-center">
                <div className="text-white">表示できる職人データがありません。</div>
            </section>
        );
    }

    return (
        <section className="bg-black">
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {masters.map((master) => (
                    <Link
                        href={master.link}
                        key={master.id}
                        className="group block relative"
                    >
                        <div className="relative h-full aspect-[120/43] overflow-hidden">
                            <Image
                                src={`/images/${master.id}.png`}
                                alt={`${master.romajiName} - ${master.name}`}
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="z-[1] bg-white/20 border border-white text-white px-14 py-4 text-sm font-medium hover:bg-white/40 transition-colors">
                                    今すぐ詳細を見る
                                </div>
                            </div>
                            <div className="absolute inset-0 flex flex-col ml-5 sm:ml-4 lg:ml-14 items-start justify-center group-hover:opacity-20 duration-300">
                                <h3 className="text-white md:text-lg xl:text-2xl font-bold mb-2">
                                    {master.name}
                                </h3>
                                <p className="text-white/90 md:text-lg xl:text-2xl tracking-wide mb-4 lg:mb-14">
                                    {master.romajiName}
                                </p>
                                <div className="relative w-full flex flex-row items-center ml-16 sm:ml-0 lg:ml-20 2xl:ml-28">
                                    <div className="w-[6px] h-[6px] rotate-45 origin-center bg-white" />
                                    <div className="w-1/4 sm:w-36 md:w-44 lg:w-32 xl:w-1/4 2xl:w-1/4 h-px bg-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MasterHome;

