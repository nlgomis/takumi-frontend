"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import AboutHome from "@/components/AboutHome";
import RecommendHome from "@/components/RecommendHome";
import DescriptionHome from "@/components/DescriptionHome";
import MasterHome from "@/components/MasterHome";
import AccessHome from "@/components/AccessHome";

export default function Home() {
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

    return (
        <div>
            <Hero />
            <AboutHome />
            <RecommendHome />
            <DescriptionHome />
            <MasterHome />
            <AccessHome />
        </div>
    );
}
