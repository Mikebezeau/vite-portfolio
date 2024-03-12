import { useLocation } from "react-router-dom";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

function SideBar() {
  const location = useLocation();
  let title = "";
  const firstPath = location.pathname.split("/")[1];
  if (firstPath === "") title = "HOMEPAGE";
  else if (firstPath === "skills") title = "WEB DEVELOPMENT SKILLS";
  else if (firstPath === "projects") title = "MY PROJECTS";
  return (
    <div
      className="mt-[90px] flex w-[90px] border-r-[1px] dark:bg-slate-800
    h-screen fixed flex-col justify-around items-center"
    >
      <div className="h-[30%]">
        <h2 className="-rotate-90 tracking-widest text-left w-full">{title}</h2>
      </div>
      <div className="flex flex-col gap-7 mb-10">
        <a
          target="_blank"
          href="https://github.com/Mikebezeau"
          className="text-black text-[40px]"
        >
          <IoLogoGithub className="cursor-pointer hover:scale-150 hover:text-blue-500 transition-all ease-in-out" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/michael-bezeau/"
          className="text-black text-[40px]"
        >
          <IoLogoLinkedin className="cursor-pointer hover:scale-150 hover:text-blue-500 transition-all ease-in-out" />
        </a>
      </div>
    </div>
  );
}

export default SideBar;
