//import { useState } from "react";
import { Link } from "react-router-dom";
//import { isBrowser } from "react-device-detect";
import logo from "/logo.png";
//import MobileMenu from "./MobileMenu";
import menu from "../Content/MenuItems";

function Header() {
  //const [showMobileMenu, setShowMobileMenu] = useState(false);
  /*
  const toggleMenu = (): void => {
    setShowMobileMenu(!showMobileMenu);
  };
*/
  const MailTo = () => (
    <a href="mailto:mikebezeau@gmail.com">
      <div
        className="w-[70px] h-[70px]
        bg-red-500 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>
    </a>
  );

  /*
  const MobileHamburger = () => (
    <div className="flex items-center pr-8" onClick={toggleMenu}>
      <svg
        className="w-12 h-12 text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
          d="M5 7h14M5 12h14M5 17h14"
        />
      </svg>
    </div>
  );
*/
  return (
    <div className="flex flex-col fixed w-full z-50">
      <div className="flex items-center w-full justify-between border-b-[1px] bg-white shadow-md">
        <Link to="/">
          <div
            className="w-[70px] h-[70px]
        bg-black"
          >
            <img src={logo} className="p-2" />
          </div>
        </Link>
        {/*isBrowser && (*/}
        <div className="grid grid-flow-col h-[70px] w-full justify-stretch md:justify-center">
          {menu.map((item) => (
            <Link key={item.id} to={item.link}>
              <div
                className="flex items-center justify-center cursor-pointer h-full md:min-w-[120px]
                hover:bg-slate-200 transition-colors ease-in-out duration-300 font-medium text-black"
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        {/*})}*/}
        {/*isBrowser ? <MailTo /> : <MobileHamburger />*/}
        <MailTo />
      </div>
      {/*showMobileMenu && <MobileMenu toggleMenu={toggleMenu} />*/}
    </div>
  );
}

export default Header;
