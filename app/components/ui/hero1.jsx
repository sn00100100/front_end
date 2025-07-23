import Link from "next/link"
import ButtonHero from "./buttonHero"

export default function Hero() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-8xl font-bold mb-4">Quick Shelf</h1>
                <p className="text-2xl text-gray-600 mb-4">Everything you need to quickly get</p>
                <p className="text-2xl text-gray-600 mb-4">a library management system up and running.</p>
                <Link href="/signup"><ButtonHero text="Get started"/></Link>
            </div>
        </section>
    )
}