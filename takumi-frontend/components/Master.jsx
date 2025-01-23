import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const masters = [
    {
        id: 1,
        imageUrl: "/images/master1.png",
        name: "山田 龍之介",
        nameEn: "Ryunosuke Yamada",
        link: "/masters/ryunosuke-yamada"
    },
    {
        id: 2,
        imageUrl: "/images/master2.png",
        name: "高橋 彦太郎",
        nameEn: "Hikotaro Takahashi",
        link: "/masters/hikotaro-takahashi"
    },
    {
        id: 3,
        imageUrl: "/images/master3.png",
        name: "鈴木 美咲",
        nameEn: "Misaki Suzuki",
        link: "/masters/misaki-suzuki"
    },
    {
        id: 4,
        imageUrl: "/images/master4.png",
        name: "佐藤 武",
        nameEn: "Takeshi Sato",
        link: "/masters/takeshi-sato"
    },
]
const Master = () => {
    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {masters.map(master => (
                    <Link
                        href={master.link}
                        key={master.id}
                        className="group block"
                    >
                        <div className="relative h-full aspect-[120/43] overflow-hidden">
                            <Image
                                src={master.imageUrl}
                                alt={`${master.nameEn} - ${master.name}`}
                                fill
                                className="object-contain transition-all duration-500 group-hover:brightness-75 cursor-pointer"
                            />
                            {/* テキストオーバーレイ */}
                            <div className="absolute inset-0 flex flex-col ml-5 sm:ml-4 lg:ml-14 items-start justify-center ">
                                <h3 className="text-white md:text-lg xl:text-2xl font-bold mb-2">
                                    {master.name}
                                </h3>
                                <p className="text-white/90 md:text-lg xl:text-2xl tracking-wide mb-4 lg:mb-14">
                                    {master.nameEn}
                                </p>

                                {/* Diamond and Line */}
                                <div className="relative w-full flex flex-row items-center ml-16 sm:ml-0 lg:ml-20 2xl:ml-28">
                                    <div className=" w-[6px] h-[6px] rotate-45 origin-center bg-white" />
                                    <div className=" w-1/4 sm:w-36 md:w-44 lg:w-32 xl:w-1/4 2xl:w-1/4 h-px bg-white" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Master