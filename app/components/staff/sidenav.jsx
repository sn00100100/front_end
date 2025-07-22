import NavLinks from "./navLinks"
import Logo from '../logo'
import MemberDropDown from './memberDropDown'
import TransDropDown from './transDropDown'
import BookDropDown from './bookDropDown'

export default function SideNav() {
    return (
        <nav className="basis-2/12 h-screen bg-gradient-to-r from-blue-200 to-white">
        <div className="m-2">
            <Logo width={210} height={95} />
        </div>
        <div> 
            <ul>
            <NavLinks linkText="Dashboard" />
            <MemberDropDown />
            <BookDropDown />
            <TransDropDown />
            <NavLinks linkText="Report" />
            <NavLinks linkText="Logout" />
            </ul>
        </div>
        </nav>
    )
}
