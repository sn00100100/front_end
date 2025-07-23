export default function ButtonHeader( { text }) {
    return (
        <button
          className="py-4 px-4 text-white
            bg-blue-500 hover:bg-gray-700
            text-2xl font-medium border rounded-lg"
        >
            { text }
        </button>
    )
}