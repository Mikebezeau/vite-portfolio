import Strings from "../../Content/Strings";
import design from "/design.png";
import backend from "/backend.png";
//import { IoArrowForwardOutline } from "react-icons/io5";

function Services() {
  const servicesList = [
    {
      id: 1,
      title: Strings.FRONTED,
      desc: Strings.FRONTED_DESC,
      logo: design,
    },
    {
      id: 2,
      title: Strings.BACKEND,
      desc: Strings.BACKEND_DESC,
      logo: backend,
    } /*
        {
          id: 3,
          title: Strings.ONLINE,
          desc: Strings.ONLINE_DESC,
          logo: "/teaching.png",
        },*/,
  ];
  return (
    <div className="mt-12">
      <div className="flex items-center">
        <div className="w-[20px] h-[7px] bg-blue-600 rounded-full"></div>
        <div className="w-full border-[1px] mx-4 mt-[-2px]"></div>
        <h2 className="text-[24px] font-bold">{Strings.SERVICES}</h2>
        <div className="w-full border-[1px] mt-[-2px] mx-4"></div>
        <div className="w-[20px] h-[7px] bg-blue-600 rounded-full"></div>
      </div>
      <div className="flex flex-col xl:flex-row justify-around">
        {servicesList.map((item) => (
          <div
            key={item.id}
            className="text-center flex flex-col items-center
                gap-6 mt-16"
          >
            <div className="bg-gray-200 rounded-full w-[80px] h-[80px]">
              <img
                src={item.logo}
                className="w-[80px] h-[80px]
                        p-5 hover:scale-110 transition-all cursor-pointer"
              />
            </div>
            <h2 className="mt-5 font-bold">{item.title}</h2>
            <h2 className="text-gray-700 text-lg px-4">{item.desc}</h2>
            {/*
            <IoArrowForwardOutline
              className="bg-blue-500 text-[35px]
                    p-2 text-white rounded-full cursor-pointer hover:scale-150
                    transition-all"
        />*/}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
