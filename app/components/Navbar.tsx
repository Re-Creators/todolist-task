import { useSession } from "next-auth/react";
import React from "react";
import profileImg from "@/public/default-profile.png";
import Image from "next/image";
import ProfileMenu from "./common/ProfileMenu";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="p-3 w-full shadow-md">
      <div className="container lg:mx-auto flex justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            TODO<span className="text-primary">.</span>
          </h1>
        </div>
        <ProfileMenu>
          <div className="flex items-center cursor-pointer">
            <Image src={profileImg} alt="profile" width={45} height={45} />
            <div className="ml-3">
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
          </div>
        </ProfileMenu>
      </div>
    </div>
  );
};

export default Navbar;
