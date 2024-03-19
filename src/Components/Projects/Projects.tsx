import { useEffect, useState } from "react";
import { Link, useBlocker } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Strings from "../../Content/Strings";
import {
  personalProjects,
  professionalProjects,
} from "../../Content/ProjectList";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import NoImagesSvg from "./NoImagesSvg";

export interface projectProps {
  id: string;
  url: string;
  urlGithub: string;
  images: {
    src: string;
  }[];
  title: string;
  assoc: string;
  description: string;
  details: {
    heading: string;
    content: string;
  }[];
}

interface itemProps {
  id: string;
  open: boolean;
}
[];

const Projects = () => {
  //stores the open property for controlling lightbox galleries
  const [openList, setOpenList] = useState<itemProps[]>([
    {
      id: "",
      open: false,
    },
  ]);

  //function to set open property to display/hide lightbox galleries
  const toggleOpen = (projectId: string) => {
    const itemElement: itemProps | undefined = openList.find(
      (item: itemProps) => item.id === projectId
    );
    if (itemElement) {
      const newOpenList: itemProps[] = [...openList];
      newOpenList.filter((item) => item.id !== projectId);
      itemElement.open = !itemElement.open;
      newOpenList.push(itemElement);
      setOpenList(newOpenList);
    }
  };

  // Block navigating elsewhere when a lightbox is open
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      openList.find((item: itemProps) => item.open === true) !== undefined &&
      currentLocation.pathname !== nextLocation.pathname
  );

  //generate project lightbox open list
  //regenerate lightbox in closed state anytime blocker is triggered
  useEffect(() => {
    //full list of all projects
    const lightboxOpenProjectList = [
      ...personalProjects,
      ...professionalProjects,
    ];
    const list: itemProps[] = [];
    lightboxOpenProjectList.forEach((project) => {
      list.push({ id: project.id, open: false });
    });
    setOpenList([...list]);
  }, [blocker]);

  //display a list of projects with heading
  interface ProjectListDisplayProps {
    projectTypeHeading: string;
    projectList: projectProps[];
  }
  const ProjectListDisplay: React.FC<ProjectListDisplayProps> = ({
    projectTypeHeading,
    projectList,
  }) => (
    <>
      <div className="h-[60px] border-r-[1px]" />
      <div className="w-[5px] h-[5px] bg-blue-600 rounded-full"></div>
      <h2 className="text-[30px] font-bold uppercase mt-16">
        {projectTypeHeading}
      </h2>
      <div className="flex flex-wrap justify-center gap-20 mt-8 weight-800">
        {projectList.map((project) => (
          <div key={project.id} className="flex flex-col w-64 h-64">
            <div
              className={`bg-blue-600 rounded-xl w-40 h-40 m-auto ${
                project.images.length > 1 &&
                "cursor-pointer hover:scale-110 transition-all"
              }`}
              onClick={() => {
                if (project.images.length > 1) toggleOpen(project.id);
              }}
            >
              <div className="relative flex p-1 w-full pointer-events-none text-blue-600">
                <img
                  src={project.images[0].src}
                  className="rounded-lg w-full"
                />
                {project.images.length <= 1 && <NoImagesSvg />}
              </div>
            </div>

            <Link to={`/projects/${project.id}`}>
              <button className="w-full font-bold text-white bg-blue-600 uppercase h-16">
                {project.title}
              </button>
            </Link>

            <Lightbox
              open={
                openList.find(
                  (item: itemProps) => item.id === project.id && item.open
                )
                  ? true
                  : false
              }
              close={() => toggleOpen(project.id)}
              slides={project.images}
            />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="pt-16 text-center flex flex-col items-center w-full">
      <h2 className="text-[40px] font-bold uppercase">PROJECTS</h2>
      <BiSolidQuoteAltLeft
        className="bg-blue-500 p-3 text-[44px] rounded-full
        mt-6 text-white"
      />
      <h3 className="my-5 text-gray-700 text-lg">{Strings.PROJECTS_DESC}</h3>
      <BiSolidQuoteAltRight className="bg-blue-500 p-3 text-[44px] rounded-full text-white" />
      <ProjectListDisplay
        projectTypeHeading="Professional Projects"
        projectList={professionalProjects}
      />
      <ProjectListDisplay
        projectTypeHeading="Experimentation / Learning"
        projectList={personalProjects}
      />
    </div>
  );
};

export default Projects;
