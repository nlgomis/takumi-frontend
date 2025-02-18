"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import AboutHome from "@/components/AboutHome";
import RecommendHome from "@/components/RecommendHome";
import DescriptionHome from "@/components/DescriptionHome";
import MasterHome from "@/components/MasterHome";
import AccessHome from "@/components/AccessHome";

// スクロール処理を別コンポーネントとして分離
function ScrollToSection() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get("section");
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [searchParams]);

    return null;
}

export default function Home() {
    // ページがマウントされたときにトップにスクロール
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);
    return (
        <div >
            <Suspense fallback={null}>
                <ScrollToSection />
            </Suspense>
            <Hero />
            <AboutHome />
            <RecommendHome />
            <DescriptionHome />
            <MasterHome />
            <AccessHome />
        </div>
    );
}