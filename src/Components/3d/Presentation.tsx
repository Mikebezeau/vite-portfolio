import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { IoArrowUp, IoArrowDown, IoClose } from "react-icons/io5";
import PresentationScenes from "./PresentationScenes";
import useStore3d from "../../store/store3d";
import { SCENE, FIRST_SCENE, LAST_SCENE } from "./helpers/sceneConst";

const Presentation = () => {
  const [pageNumber, setPageNumber] = useState(0);
  // storing pageNumber as ref in store to be able to access it in 3d components
  const setPageNumberRef = useStore3d((state) => state.setPageNumberRef);
  const fadeToWhite = useStore3d((state) => state.fadeToWhite);
  const setFadeToWhite = useStore3d((state) => state.setFadeToWhite);
  const endPresentation = useStore3d((state) => state.endPresentation);
  const setEndPresentation = useStore3d((state) => state.setEndPresentation);
  const sceneRef = useStore3d((state) => state.sceneRef);
  const setSceneRef = useStore3d((state) => state.setSceneRef);
  //const [isDarkMode, setIsDarkMode] = useState(true);
  const [restartPresentation, setRestartPresentation] = useState(false);
  const isDarkMode = true;
  const maxPageNum = 3;
  const [changingPage, setChangingPage] = useState(false);

  const fadeTrasitionDivRef = useRef<HTMLDivElement>(null);

  // fade to white canvas transition
  useEffect(() => {
    if (fadeTrasitionDivRef.current !== null) {
      if (fadeToWhite) {
        fadeTrasitionDivRef.current.style.transition = "ease-in opacity 0.6s";
        fadeTrasitionDivRef.current.style.opacity = "0";
        setTimeout(() => {
          setFadeToWhite(false);
        }, 400);
      } else {
        fadeTrasitionDivRef.current.style.transition = "ease-out opacity 0.2s";
        fadeTrasitionDivRef.current.style.opacity = "1";
      }
    }
  }, [fadeToWhite, setFadeToWhite]);

  // fade to white at end of presentation
  useEffect(() => {
    if (endPresentation) {
      //setTimeout(() => {
      if (fadeTrasitionDivRef.current !== null) {
        fadeTrasitionDivRef.current.style.transition = "ease-out opacity 1s";
        fadeTrasitionDivRef.current.style.opacity = "0";
      }
      //}, 1000);
    }
  }, [endPresentation]);

  // fade  white to black on fist load
  // order of useEffect matters, this will supersede the above useEffect
  useEffect(() => {
    if (restartPresentation) {
      if (fadeTrasitionDivRef.current !== null) {
        fadeTrasitionDivRef.current.style.transition = "ease-out opacity 1s";
        fadeTrasitionDivRef.current.style.opacity = "1";
      }
      setRestartPresentation(false);
    }
    // to hide the page change buttons while loading
    setChangingPage(true);
    setTimeout(() => {
      setChangingPage(false);
    }, 1500);
  }, [restartPresentation]);

  const handleRestartPresentation = () => {
    setPageNumber(0);
    setPageNumberRef(0);
    setSceneRef(FIRST_SCENE);
    setFadeToWhite(false);
    setEndPresentation(false);
    setRestartPresentation(true);
  };

  /*
  // toggle switch for light or dark mode
  function ModeToggle() {
    const handleToggle = () => {
      setIsDarkMode(!isDarkMode);
    };
    return (
      <div className="absolute z-50 top-4 right-8 text-gray-500">
        <label
          htmlFor="modeToggle"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              type="checkbox"
              id="modeToggle"
              checked={isDarkMode}
              onChange={handleToggle}
              className="sr-only"
            />
            <div className="block bg-gray-400 w-14 h-8 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-gray-600 w-6 h-6 rounded-full transition transform ${
                isDarkMode ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
          <span className="ml-3">
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </span>
        </label>
      </div>
    );
  }
*/

  const handlePageChange = useCallback(
    (increment: number) => {
      if (!changingPage) {
        const newPageNumber = pageNumber + increment;
        if (newPageNumber >= 0 && newPageNumber <= maxPageNum) {
          setPageNumber(newPageNumber); //for UI to update
          setPageNumberRef(newPageNumber); //for 3d components to reference within useFrame
          setChangingPage(true);
          // if last scene keep change page buttons hidden
          if (newPageNumber !== maxPageNum) {
            setTimeout(() => {
              setChangingPage(false);
            }, 2000);
          }

          //set scene according to page number
          switch (newPageNumber) {
            case 0:
              setSceneRef(FIRST_SCENE);
              break;
            case 1:
              setSceneRef(SCENE.system);
              break;
            case 2:
              if (sceneRef.current === SCENE.tiles) setSceneRef(SCENE.ocean);
              else setSceneRef(SCENE.zoomInEarth);
              // Once camera is zoomed tp earth for page 2
              // scene is set to 'SCENE.ocean' within PresentationScenes useFrame loop
              break;
            case 3:
              setSceneRef(SCENE.tiles);
              // Once camera is zoomed tp earth for page 2
              // scene is set to 'SCENE.ocean' within PresentationScenes useFrame loop
              break;
            default:
              setSceneRef(FIRST_SCENE);
          }
        }
      }
    },
    [
      changingPage,
      pageNumber,
      setPageNumber,
      setPageNumberRef,
      sceneRef,
      setSceneRef,
    ]
  );

  // page navigation buttons / mobile swipe
  useEffect(() => {
    let startSwipeY = 0;

    const handleScroll = (event: WheelEvent) => {
      const increment = event.deltaY > 0 ? 1 : -1;
      handlePageChange(increment);
    };

    const handleSwipeStart = (event: TouchEvent) => {
      startSwipeY = event.touches[0].clientY;
    };

    const handleSwipeMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = currentY - startSwipeY;

      if (deltaY > 10) {
        handlePageChange(-1);
      } else if (deltaY < -10) {
        handlePageChange(1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleSwipeStart);
    window.addEventListener("touchmove", handleSwipeMove);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleSwipeStart);
      window.removeEventListener("touchmove", handleSwipeMove);
    };
  }, [handlePageChange]);

  const iconClasses =
    "border-2 bg-black border-blue-600 p-1 w-8 h-8 rounded-full fixed z-50 cursor-pointer hover:scale-150 text-white hover:text-blue-600 transition-all ease-in-out";
  // link to end presentation and return to home
  const PresentationExit = () => {
    return (
      <Link to={"/"}>
        <IoClose className={`${iconClasses} top-4 left-8`} />
      </Link>
    );
  };

  const PageNavigation = () => {
    return (
      <>
        {pageNumber > 0 && (
          <IoArrowUp
            className={`${iconClasses} top-8 left-[50vw] -ml-4`}
            onClick={() => handlePageChange(-1)}
          />
        )}
        {pageNumber < maxPageNum && (
          <IoArrowDown
            className={`${iconClasses} bottom-8 left-[50vw] -ml-4`}
            onClick={() => handlePageChange(1)}
          />
        )}
      </>
    );
  };

  const PresentationEnd = () => {
    return (
      <div className="absolute z-10 text-3xl md:text-6xl text-black left-1/2 top-1/2">
        <div className="ml-[-50%] -mt-24">
          <div className="mb-4">THANKS FOR WATCHING</div>
          <div
            onClick={handleRestartPresentation}
            className="cursor-pointer hover:text-blue-500"
          >
            RESTART
          </div>
          <div>
            <Link
              className="text-black hover:text-blue-500 font-normal"
              to={"/"}
              onClick={handleRestartPresentation}
            >
              EXIT
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="overscroll-none select-none fixed z-50 top-0 left-0 bottom-0 right-0 bg-white">
      {/*<ModeToggle />*/}
      {endPresentation ? (
        <PresentationEnd />
      ) : (
        <>
          <PresentationExit />
        </>
      )}
      <div
        ref={fadeTrasitionDivRef}
        className="w-full h-full bg-black"
        style={{ opacity: 0 }}
      >
        <Suspense
          fallback={
            <div className="absolute text-6xl text-white left-1/2 top-1/2">
              <div className="ml-[-50%] mt-[-50%]">LOADING</div>
            </div>
          }
        >
          {!changingPage && <PageNavigation />}
          <Canvas
            camera={{ position: [0, 0, 0], near: 0.001, far: 500, fov: 90 }}
          >
            <PresentationScenes isDarkMode={isDarkMode} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default Presentation;
