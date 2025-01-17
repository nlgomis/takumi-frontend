import Hero from "@/components/Hero";
import About from "@/components/About";
import Recommend from "@/components/Recommend";
import Description from "@/components/Description";
import Master from "@/components/Master";


export default function Home() {
    return (
        <div>
            <Hero />
            <About />
            <Recommend />
            <Description />
            <Master />
        </div>
    );
}
