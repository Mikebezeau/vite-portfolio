import Strings from "../../Content/Strings";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

function About() {
  return (
    <div className="mt-8 text-center flex flex-col items-center">
      <h2 className="text-[40px] font-bold">{Strings.ABOUT_HEADING}</h2>
      <BiSolidQuoteAltLeft
        className="bg-blue-500 p-3 text-[44px] rounded-full
        mt-6 text-white"
      />
      <h2 className="my-5 text-gray-700 text-lg">{Strings.ABOUT_DESC}</h2>
      <BiSolidQuoteAltRight className="bg-blue-500 p-3 text-[44px] rounded-full text-white" />
    </div>
  );
}

export default About;
