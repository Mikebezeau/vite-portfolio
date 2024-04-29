import React, { createRef } from "react";
import { create } from "zustand";
import { SCENE } from "../Components/3d/helpers/sceneConst";

const pageNumberRef = createRef<number>() as React.MutableRefObject<number>;
pageNumberRef.current = 0;

const sceneRef = createRef<number>() as React.MutableRefObject<number>;
sceneRef.current = SCENE.preSys;

type StoreState = {
  pageNumberRef: React.MutableRefObject<number>;
  setPageNumberRef: (pageNumber: number) => void;

  fadeToWhite: boolean;
  setFadeToWhite: (isFade: boolean) => void;

  sceneRef: React.MutableRefObject<number>;
  setSceneRef: (sceneRef: number) => void;

  endPresentation: boolean;
  setEndPresentation: (isFade: boolean) => void;

  x: number;
  y: number;
  z: number;
};

const useStore3d = create<StoreState>((set, get) => ({
  pageNumberRef,
  setPageNumberRef: (newPageNumber) => {
    if (get().pageNumberRef.current !== newPageNumber)
      get().pageNumberRef.current = newPageNumber;
  },
  fadeToWhite: false,
  setFadeToWhite: (isFade) => {
    set(() => ({ fadeToWhite: isFade }));
  },
  sceneRef,
  setSceneRef: (newScene) => {
    if (get().sceneRef.current !== newScene) {
      //console.log("setSceneRef", newScene);
      get().sceneRef.current = newScene;
    }
  },

  endPresentation: false,
  setEndPresentation: (isEnd) => {
    set(() => ({ endPresentation: isEnd }));
  },
  x: 0,
  y: 0,
  z: 0,
  setXyz: set(() => ({ x: 0, y: 0, z: 0 })),
}));

export default useStore3d;
