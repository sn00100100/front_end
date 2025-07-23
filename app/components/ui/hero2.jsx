import Link from "next/link"

export default function Hero() {
    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-6xl font-bold mb-4">Manage your library resources.</h1>
                <p className="text-2xl text-gray-600 mb-4">Our library management system enable library staffs</p>
                <p className="text-2xl text-gray-600 mb-4">to register new members, add, or update books,</p>
                <p className="text-2xl text-gray-600 mb-4">process check-outs and returns, track transactions,</p>
                <p className="text-2xl text-gray-600 mb-4">and generate operational reports.</p>
            </div>
        </section>
    )
}