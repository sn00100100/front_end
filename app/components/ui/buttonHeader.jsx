import Link from 'next/link'

export default function ButtonHeader( { text, link }) {
    return (
        <Link href={ link }>
            <button
            className="py-2 px-2 text-white
                bg-black hover:bg-white hover:text-black
                text-md font-medium border rounded-lg"
            >
                { text }
            </button>
        </Link>
    )
}