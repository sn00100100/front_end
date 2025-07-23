import MemberNavLinks from '@/app/components/member/navLinks'
import Logo from '@/app/components/logo'

export default function MemberSideNav() {
    return (
        <div className='bg-gray-200 sticky top-0 h-screen'>
            <nav> 
                <div>
                    <Logo width={210} height={95} />
                </div>
                <div> 
                    <ul>
                        <MemberNavLinks linkText="Home" />
                        <MemberNavLinks linkText="Catalog" />
                        <MemberNavLinks linkText="Search" />
                        <MemberNavLinks linkText="Overdue Fees" />
                        <MemberNavLinks linkText="Logout" />
                    </ul>
                </div>
            </nav>
        </div>
    )
}
