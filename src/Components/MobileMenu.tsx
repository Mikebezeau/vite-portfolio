//import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menu from "../Content/MenuItems";

interface FnProps {
  toggleMenu(): void;
}

const MobileMainMenu: React.FC<FnProps> = ({ toggleMenu }) => {
  return (
    <div
      className="fixed top-[90px] w-[100vw] min-h-[100vh] flex flex-col uppercase text-white bg-slate-200"
      onClick={toggleMenu}
    >
      <nav className="flex flex-col gap-4 mx-4 text-2xl md:text-lg mt-[120px]">
        {menu.map((item) => (
          <Link key={item.id} to={item.link}>
            <div
              className="flex items-center justify-center cursor-pointer h-24 w-full
                font-medium text-black text-3xl"
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
  // do not use <Outlet /> to avoid showing default index components
};

export default MobileMainMenu;
