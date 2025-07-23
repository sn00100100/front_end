import { UserCircleIcon } from "@heroicons/react/24/solid"

export default function UserAvatar() {
    return (
        <div className="flex">
            <div>
                <UserCircleIcon className="size-10 fill-black" />
            </div>
            <div className="mx-auto">
                <p className="">Name</p>
            </div>
        </div>
    )
}
