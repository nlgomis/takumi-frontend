import Hero from "@/components/Hero";
import AboutHome from "@/components/AboutHome";
import RecommendHome from "@/components/RecommendHome";
import DescriptionHome from "@/components/DescriptionHome";
import MasterHome from "@/components/MasterHome";
import AccessHome from "@/components/AccessHome";


export default function Home() {
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
