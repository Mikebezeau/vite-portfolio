import Strings from "../Content/Strings";
import skillList from "../Content/SkillList";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

function Skills() {
  return (
    <div className="pt-16 text-center flex flex-col items-center">
      <h2 className="text-[40px] font-bold">{Strings.SKILLS_HEADING}</h2>
      <BiSolidQuoteAltLeft
        className="bg-blue-500 p-3 text-[44px] rounded-full
        mt-6 text-white"
      />
      <h3 className="my-5 text-gray-700 text-lg">{Strings.SKILLS_DESC}</h3>
      <BiSolidQuoteAltRight className="bg-blue-500 p-3 text-[44px] rounded-full text-white" />
      <div className="h-[60px] border-r-[1px]" />
      <div className="w-[5px] h-[5px] bg-blue-600 rounded-full"></div>
      <div className="flex flex-wrap justify-center gap-20 mt-8">
        {skillList.map((skill) => (
          <div key={skill.title} className="bg-blue-600 rounded-xl w-32 h-32">
            {skill.svg}
            <div className="mt-4 font-extrabold text-blue-600 uppercase">
              {skill.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
