import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { isBrowser } from "react-device-detect";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Home from "./Components/Home/Home";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects/Projects";
import ProjectDetails from "./Components/Projects/ProjectDetails";
import CV from "./Components/CV";
import Presentation from "./Components/3d/Presentation";
import triangles from "./assets/triangle-top.png";

const AppLayout = () => {
  const routerLocation = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {routerLocation.pathname === "/presentation" ? (
        <Outlet />
      ) : (
        <div
          className="w-full bg-no-repeat bg-bottom pb-36"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${triangles})`,
          }}
        >
          <div
            className="absolute z-[-1] -top-12 w-full bg-no-repeat bg-top scale-[-1] h-80 mt-[70px]"
            style={{
              backgroundImage: `url(${triangles})`,
            }}
          />
          <Header />
          {isBrowser && <SideBar />}
          <div
            className={`ml-0 py-[70px] px-8 lg:px-16 ${
              isBrowser ? "ml-[70px] w-[calc(100%-70px)]" : "w-[100vw]"
            }`}
          >
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/presentation",
          element: <Presentation />,
        },
        {
          path: "/skills",
          element: <Skills />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/projects/:projectId",
          element: <ProjectDetails />,
        },
        {
          path: "/cv",
          element: <CV />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
