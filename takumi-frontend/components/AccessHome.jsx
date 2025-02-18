import Image from "next/image"
import Link from "next/link"


const sns = [
    {
        id: 1,
        imageUrl: "/images/instagram_b.png",
        alt: "instagram",
        link: "/#"
    },
    {
        id: 2,
        imageUrl: "/images/twitterX_b.png",
        alt: "twiiterX",
        link: "/#"
    },
    {
        id: 3,
        imageUrl: "/images/facebook_b.png",
        alt: "facebook",
        link: "/#"
    },
]

const AccessHome = () => {
    return (
        <section className="bg-white py-14" id='access'>
            <div className="max-w-full mx-auto">
                <div className="ml-5 lg:ml-12 mb-8 lg:mb-12">
                    <h2 className="text-darkbrown text-base lg:text-xl font-light tracking-wide mb-1">
                        Access
                    </h2>
                    <h1 className="text-darkbrown text-3xl lg:text-4xl font-light mb-2">
                        アクセス
                    </h1>
                    <div className="relative flex flex-row items-center">
                        <div className="-ml-2 w-[6px] h-[6px] rotate-45 origin-center bg-darkbrown" />
                        <div className=" w-36 lg:w-52 h-px bg-darkbrown" />
                    </div>
                </div>

                <div className="text-darkbrown text-base md:text-base lg:text-lg px-6 lg:px-28 lg:pb-12 ">
                    <div className="flex flex-col gap-y-1 lg:gap-y-4">
                        <p>住所：〒160-0023　東京都新宿区西新宿1-7-3</p>
                        <p>電話：03-3344-1010</p>
                        <p>営業時間：10:00 ~ 18:00</p>
                    </div>



                    <div className="my-8">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.403841643448!2d139.6944082117182!3d35.6916785724696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188db4f3887ae7%3A0x3d4f3619214cc0ea!2z44Kz44Kv44O844Oz44K_44Ov44O8!5e0!3m2!1sja!2sjp!4v1738324920194!5m2!1sja!2sjp"
                            title="コク-ンタワーの地図"
                            allow="fullscreen"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[450px]"
                            aria-label="コク-ンタワーの場所を示すGoogleマップ"
                        />
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="relative flex flex-row gap-2 mb-2 justify-center">
                            {sns.map(item => (
                                <Link
                                    href={item.link}
                                    key={item.id}
                                    className="relative"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.alt}
                                        width={50}
                                        height={50}
                                        className="object-cover transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer
                                        w-9 h-9 md:w-10 md:h-10"
                                    />
                                </Link>
                            ))}
                        </div>
                        <div className="relative flex flex-row items-center">
                            <div className=" w-44 md:w-52 h-px bg-darkbrown" />
                            <div className="-ml-2 w-[6px] h-[6px] rotate-45 origin-center bg-darkbrown" />
                        </div>
                    </div>
                </div>



            </div>
        </section>
    )
}

export default AccessHome;