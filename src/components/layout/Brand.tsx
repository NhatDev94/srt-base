import Link from "next/link";
import {WheatIcon} from 'lucide-react'

const Brand = () => {
    return (
        <Link href="/" className="flex items-center gap-x-2 w-fit cursor-pointer">
            <WheatIcon className="size-8 text-primary" />
            <p className="text-sm font-semibold">STR Miền Nam</p>
        </Link>
    )
}

export default Brand;