import { useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  personalProjects,
  professionalProjects,
} from "../../Content/ProjectList";
//import { BiSolidQuoteAltRight } from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io5";
import { projectProps } from "./Projects";

const ProjectDetails = () => {
  const [open, setOpen] = useState(false);
  const { projectId } = useParams();

  const project: projectProps | undefined = [
    ...personalProjects,
    ...professionalProjects,
  ].find((project) => project.id === projectId);

  return (
    <div className="pt-8 text-center flex flex-col items-center w-full">
      {project !== undefined && (
        <>
          <h2 className="text-[40px] font-bold">{project.title}</h2>
          <h2 className="my-10 text-gray-700 text-lg">{project.description}</h2>
          {/*<BiSolidQuoteAltRight className="bg-blue-500 p-3 text-[44px] rounded-full text-white" />
          <div className="h-[60px] border-r-[1px]" />
          <div className="w-[5px] h-[5px] bg-blue-600 rounded-full"></div>*/}
          <div key={project.id} className="flex flex-col w-full">
            {/*}
              <div className="bg-blue-600 rounded-xl w-40 h-40 m-auto">
                <div className="flex p-1 cursor-pointer w-full">
                  <img
                    src={project.images[0].src}
                    className="rounded-lg w-full"
                    onClick={() => setOpen(true)}
                  />
                </div>
        </div>*/}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {project.url !== "" && (
                <a href={project.url} target="_blank">
                  <button className="w-64 font-bold text-white bg-blue-600 uppercase">
                    View Project
                  </button>
                </a>
              )}
              {project.images.length > 1 && (
                <button
                  className="w-64 font-bold text-white bg-blue-600 uppercase"
                  onClick={() => setOpen(true)}
                >
                  Image Gallery
                </button>
              )}
            </div>
            {project.urlGithub !== "" && (
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <a href={project.urlGithub} target="_blank">
                  <IoLogoGithub className="cursor-pointer hover:scale-150 hover:text-blue-500 transition-all ease-in-out text-blue-600 text-[80px]" />
                </a>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-16">
              {project.details.map((detail, i) => (
                <div key={i} className="w-full md:w-[40%]">
                  <div className="text-blue-600 font-extrabold">
                    {detail.heading}
                  </div>
                  <div className="">{detail.content}</div>
                </div>
              ))}
            </div>
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={project.images}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
