import SideNav from '@/app/components/layout/staff/sidenav'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import '@/app/globals.css'

export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <div className="flex flex-row">
          <SideNav />
          <div className="basis-10/12">
            <div className="flex justify-end ">
              <UserCircleIcon className="size-10 fill-black align-items-end" />
              <p className="mr-2">Staff's Name</p>
            </div>
            <div>
              <section>{ children }</section>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}