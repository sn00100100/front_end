import SideNav from '../components/staff/sidenav.jsx'
import { UserCircleIcon } from '@heroicons/react/24/solid'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row">
      <SideNav />
      <div className="basis-10/12">
        <div className="flex justify-end bg-blue-200 bg-gradient-to-b from-blue-200 to-white">
          <UserCircleIcon className="size-10 fill-black align-items-end" />
          <p className="mr-2">Staff's Name</p>
        </div>
        <div>
          <section>{ children }</section>
        </div>
      </div>
    </div>
  );
}