"use client"
import Link from "next/link"
import Nav from "./Nav"

const Header = () => {
    return (
        <header className="bg-black text-white sticky top-0 py-8 z-40">
            <Nav/>
        </header>
    )
}

export default Header