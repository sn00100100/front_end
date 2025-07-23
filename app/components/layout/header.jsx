import Logo from '@/app/components/logo'
import Link from 'next/link'
import ButtonHeader from '../ui/buttonHeader'

export default function Header() {
    return (
        <div className="flex items-center justify-between sticky top-0 bg-white drop-shadow-md">
            <div className="m-3">
                <Logo width={147} height={66.85} />
            </div>
            <div className="flex items-center mx-auto text-lg gap-10">
                <Link href="#" className="hover:underline">Pricing</Link>
                <Link href="#" className="hover:underline">Support</Link>
                <Link href="#" className="hover:underline">Contact Us</Link>
            </div>
            <div className="flex mx-auto gap-2">
                <ButtonHeader text="Log in" link="/login" />
                <ButtonHeader text="Sign up" link="/signup" />
            </div>
        </div>
    )
}