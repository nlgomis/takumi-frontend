
import Image from "next/image"
const Footer = () => {
    return (
        <footer className="bg-black py-4 text-white text-center">
            <div className="max-w-full">
                <Image
                    src="/images/footer_logo.png"
                    alt="footer_logo"
                    width={150}
                    height={150}
                    className="object-cover mx-auto"
                />
            </div>
            <small >&copy;Takumi</small>
        </footer>
    )
}

export default Footer