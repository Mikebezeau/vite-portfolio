import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import "./App.css";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects/Projects";
import ProjectDetails from "./Components/Projects/ProjectDetails";
import Home from "./Components/Home/Home";

function App() {
  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div className="w-full">
      <Header />
      {isBrowser && <SideBar />}
      <div
        className={`ml-0 py-[70px] px-8 lg:px-16 ${
          isBrowser ? "ml-[90px]" : ""
        }`}
      >
        <Routes>
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
