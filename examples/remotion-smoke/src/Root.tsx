import React from "react";
import { Composition } from "remotion";
import { SmokeCard } from "./SmokeCard";

// 3 seconds at 30 fps, full long-form frame: 1920x1080 (16:9).
export const Root: React.FC = () => {
  return (
    <Composition
      id="SmokeCard"
      component={SmokeCard}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
