import NavLinks from '@/app/components/staff/navLinks'
import Logo from '@/app/components/logo'

export default function SideNav() {
    return (
        <nav className="basis-2/12 h-screen bg-gray-200">
            <div className="m-2">
                <Logo width={210} height={95} />
            </div>
            <div> 
                <ul>
                <NavLinks linkText="Dashboard" />
                <NavLinks linkText="Member" />
                <NavLinks linkText="Book" />
                <NavLinks linkText="Transaction" />
                <NavLinks linkText="Report" />
                <NavLinks linkText="Logout" />
                </ul>
            </div>
        </nav>
    )
}
