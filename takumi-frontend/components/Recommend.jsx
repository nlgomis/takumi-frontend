import Image from "next/image"
import Link from "next/link"

const products = [
    {
        id: 1,
        imageUrl:"/images/item1.png",
        titleJp: "コップ",
        titleEn: "Cup"
    },
    {
        id: 2,
        imageUrl:"/images/item2.png",
        titleJp: "コップ",
        titleEn: "Cup"
    },
    {
        id: 3,
        imageUrl: "/images/item3.png",
        titleJp: "花瓶",
        titleEn: "Vase"
    },
    {
        id: 4,
        imageUrl:"/images/item4.png",
        titleJp: "お茶碗",
        titleEn: "Bowl"
    },
    {
        id: 5,
        imageUrl:"/images/item5.png",
        titleJp: "飾り用のお皿",
        titleEn: "Display Plate"
    },
    {
        id: 6,
        imageUrl:"/images/item6.png",
        titleJp: "お皿",
        titleEn: "Plate"
    }
]

export default function ProductShowcase() {
    return (
        <div className="bg-black min-h-screen pt-14">
            <div className="max-w-full mx-auto">
                <div className="ml-12 mb-8">
                    <h2 className="text-white text-base lg:text-xl font-light tracking-wide mb-1">
                        Recommend
                    </h2>
                    <h1 className="text-white text-3xl lg:text-4xl font-light mb-2">
                        おすすめ
                    </h1>
                     {/* Diamond and Line */}
                    <div className="relative flex flex-row items-center">
                        <div className="-ml-2 w-[6px] h-[6px] rotate-45 origin-center bg-white" />
                        <div className=" w-36 lg:w-52 h-px bg-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map(product => (
                        <div key={product.id} className="flex flex-col">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.imageUrl}
                                    alt={`${product.titleEn} - ${product.titleJp}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-[#3C2A21] p-4 text-center">
                                <h3 className="text-white text-xl mb-1">{product.titleJp}</h3>
                                <p className="text-white/70 text-sm tracking-wider">
                                    {product.titleEn}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
