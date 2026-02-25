import Link from "next/link";

const Brand = () => {
    return (
        <Link href="/" className="flex items-center gap-x-2 w-fit cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl font-semibold text-gray-200">A</div>
            <p className="text-sm font-semibold">STR Miền Nam</p>
        </Link>
    )
}

export default Brand;