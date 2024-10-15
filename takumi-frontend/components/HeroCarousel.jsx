'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Pagination, Autoplay } from 'swiper/modules';

const heroData = [
    {
        _id: '1',
        url: '/images/slider1.png',
        alt: 'hero1',
        link: '/'
    },
    {
        _id: '2',
        url: '/images/slider2.png',
        alt: 'hero2',
        link: '/about/'
    },
    {
        _id: '3',
        url: '/images/slider3.png',
        alt: 'hero3',
        link: '/craftsman/'
    },
    {
        _id: '4',
        url: '/images/slider4.png',
        alt: 'hero4',
        link: '/access/'
    },
];

const HeroCarousel = () => {
    return (
        <div className="relative w-full h-[calc(100vh-104px)]">
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className='w-full h-full'
            >
                {heroData.map(hero => (
                    <SwiperSlide key={hero._id}>
                        <Link href={hero.link}>
                            <Image
                                src={hero.url}
                                alt={hero.alt}
                                fill
                                style={{
                                    objectFit: 'cover',
                                }}
                                quality={100}
                                priority
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Image
                    src="/images/mainvisual_logo.png"
                    alt="メインロゴ"
                    width={250}
                    height={250}
                    quality={100}
                    priority
                />
            </div>
        </div>
    );
};

export default HeroCarousel;