import StaffNavLinks from '@/app/components/staff/navLinks'
import Logo from '@/app/components/logo'

export default function StaffSideNav() {
    return (
        <nav className="basis-2/12 h-screen bg-gray-200">
            <div className="m-2">
                <Logo width={210} height={95} />
            </div>
            <div> 
                <ul>
                    <StaffNavLinks linkText="Dashboard" />
                    <StaffNavLinks linkText="Member" />
                    <StaffNavLinks linkText="Book" />
                    <StaffNavLinks linkText="Transaction" />
                    <StaffNavLinks linkText="Report" />
                    <StaffNavLinks linkText="Logout" />
                </ul>
            </div>
        </nav>
    )
}
